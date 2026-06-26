import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

export class AuthService {
  async register(name: string, email: string, password: string) {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create new user - always as 'member' role
    // Only admins can promote users to admin role
    const user = await User.create({
      name,
      email,
      password,
      role: "member",
    });

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Save refresh token
    user.refreshTokens.push(refreshToken);
    await user.save();

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    // Find user with password field
    const user = await User.findOne({ email }).select(
      "+password +refreshTokens",
    );
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Save refresh token (limit to 5 active tokens)
    user.refreshTokens.push(refreshToken);
    if (user.refreshTokens.length > 5) {
      user.refreshTokens = user.refreshTokens.slice(-5);
    }
    await user.save();

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    // Verify refresh token
    const decoded = verifyRefreshToken(token);

    // Find user and check if token is valid
    const user = await User.findById(decoded.id).select("+refreshTokens");
    if (!user || !user.refreshTokens.includes(token)) {
      throw new Error("Invalid refresh token");
    }

    // Generate new tokens
    const accessToken = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = generateRefreshToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Replace old refresh token with new one
    user.refreshTokens = user.refreshTokens.map((t) =>
      t === token ? newRefreshToken : t,
    );
    await user.save();

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(userId: string, refreshToken: string) {
    const user = await User.findById(userId).select("+refreshTokens");
    if (!user) {
      throw new Error("User not found");
    }

    // Remove refresh token
    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
    await user.save();

    return { message: "Logged out successfully" };
  }
}

export default new AuthService();
