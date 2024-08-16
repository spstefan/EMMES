export class Task {
    private description: string;
    private rewardValue: number;
    private completionStatus: boolean;
    private static idCounter: number = 0;
    private readonly _id: number;

    constructor(description: string, rewardValue: number, completionStatus: boolean = false) {
        this.description = description;
        this.rewardValue = rewardValue;
        this.completionStatus = completionStatus; 
        this._id = Task.generateId();
    }

    private static generateId(): number {
        return ++Task.idCounter;
    }

    get id(): number {
        return this._id;
    }

    get taskCompletionStatus(): boolean {
        return this.completionStatus;
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
