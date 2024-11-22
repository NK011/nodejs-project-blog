const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { generateToken } = require("../utils/jwtAuthentication");

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        salt: {
            type: String,
        },
        password: {
            type: String,
        },
        profileImageUrl: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
        },
        role: {
            type: String,
            enum: ["normal", "admin"],
            default: "normal",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.static(
    "validateUserAndGenerateToken",
    async function (email, password) {
        const user = await this.findOne({ email });

        if (!user) {
            throw new Error("No such user found!! :(");
        }

        const salt = user.salt;
        const hashedPassword = user.password;

        const userProvidedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");

        if (hashedPassword !== userProvidedPassword) {
            throw new Error("Password did not match!! :(");
        }

        const token = generateToken(user);

        return token;
    }
);

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

const User = model("user", userSchema);

module.exports = User;
