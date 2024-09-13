import CASAuthService from "tomuss-api/dist/services/CASAuthService";

export class CASService {
    public authService!: CASAuthService;
    isLoggedIn: boolean = false;

    async login(username: string, password: string): Promise<void> {
        this.authService = new CASAuthService();
        await this.authService.login(username, password);
        this.isLoggedIn = true;
    }
}