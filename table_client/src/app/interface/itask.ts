export interface ITask {
    _id: string
    title: string,
    description: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string
}
