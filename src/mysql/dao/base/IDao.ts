export interface IDao<T> {
    // C
    createAsync(item: T): Promise<void>

    // R
    readByIdAsync(id: number): Promise<T | null>
    readAllAsync(): Promise<Array<T>>

    // U
    updateAsync(item: T): Promise<void>

    // D
    deleteAsync(item: T): Promise<void>
}