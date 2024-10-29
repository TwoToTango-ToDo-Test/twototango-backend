import type { UserRepository } from "src/repositories/user.repository";

export class UserValidations {
    public constructor(private readonly userModel: UserRepository) {}

    public EmailExistsAsync = async (email: string): Promise<boolean> => {
        const user = await this.userModel.GetByEmail(email);
        return !!user;
    };

    // eslint-disable-next-line @typescript-eslint/require-await
    public EmailIsValidAsync = async (email: string): Promise<string[]> => {
        const errors: string[] = [];
        if (!email) {
            errors.push("Email is required");
        }
        if (email && !email.includes("@")) {
            errors.push("Email required a valid format, missing @");
        }
        if (email && !email.includes(".")) {
            errors.push("Email required a valid format, missing .");
        }
        if (email.length < 5) {
            errors.push("Email must be at least 5 characters");
        }
        if (errors.length === 0) {
            return [];
        }
        return errors;
    };

    public PasswordIsValid = (password: string): string[] => {
        const errors: string[] = [];
        if (!password) {
            errors.push("Password is required");
        }
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters");
        }
        if (!RegExp(/[A-Z]/).exec(password)) {
            errors.push("Password must contain an uppercase letter");
        }
        if (!RegExp(/[a-z]/).exec(password)) {
            errors.push("Password must contain a lowercase letter");
        }
        if (!RegExp(/[!@#$%^&*]/).exec(password)) {
            errors.push("Password must contain a special character");
        }
        if (!RegExp(/\d/).exec(password)) {
            errors.push("Password must contain a number");
        }
        if (RegExp(/\s/).exec(password)) {
            errors.push("Password must not contain whitespace");
        }
        return errors;
    };

    private containsNumber(password: string): boolean {
        return /\d/.test(password);
    }
}
