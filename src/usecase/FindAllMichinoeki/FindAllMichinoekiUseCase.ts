export interface FindAllMichinoekiOutputData {}

export interface FindAllMichinoekiPresenter {
  emit(data: FindAllMichinoekiOutputData): void
}

export interface FindAllMichinoekiUseCase {
  execute(): Promise<FindAllMichinoekiOutputData>
}
