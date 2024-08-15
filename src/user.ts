class User {
    private name: string; 
    private silver: number;
    private gold: number;
    private gems: number;

    constructor(name: string) {
        this.name = 'user';
        this.silver = 0;
        this.gold = 0;
        this.gems = 0;
    }

    addCurrency(type: string, amount: number): void {
        switch (type) {
            case 'silver':
                this.#addSilver(amount);
                break;
            case 'gold':
                this.#addGold(amount);
                break;
            case 'gems':
                this.#addGems(amount);
                break;
        }
    }

    spendCurrency(type: string, amount: number): void {
        switch (type) {
            case 'silver':
                this.#spendSilver(amount);
                break;
            case 'gold':
                this.#spendGold(amount);
                break;
            case 'gems':
                this.#spendGems(amount);
                break;
        }
    }

    #addSilver(amount: number): void {
        this.silver += amount
    }

    #spendSilver(amount: number): void {
        this.silver -= amount
    }

    #addGold(amount: number): void {
        this.gold += amount
    }

    #spendGold(amount: number): void {
        this.gold -= amount
    }

    #addGems(amount: number): void {
        this.gems += amount
    }

    #spendGems(amount: number): void {
        this.gems -= amount
    }

}