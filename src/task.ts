export class Task {
    private description: string;
    private rewardValue: number;
    private completionStatus: boolean;

    constructor(description: string, rewardValue: number, completionStatus: boolean = false) {
        this.description = description;
        this.rewardValue = rewardValue;
        this.completionStatus = completionStatus; 
    }

    completeTask(): void {
        this.completionStatus = true;
    }

    getDescription(): string {
        return this.description;
    }
    
    editdescription(description: string): void {
        this.description = description;
    } 

    resetTask(): void {
        this.completionStatus = false;
    }

    getRewardValue(): number {
        return this.rewardValue;
    }

    getTaskInfo(): { description: string; rewardValue: number; status: boolean } {
        return {
            description: this.description,
            rewardValue: this.rewardValue,
            status: this.completionStatus
        };
    }
}
