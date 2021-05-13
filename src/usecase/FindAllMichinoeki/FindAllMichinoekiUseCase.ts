export interface FindAllMichinoekiInputData {}
export interface FindAllMichinoekiOutputData {}

export interface FindAllMichinoekiPresenter {
  emit(data: FindAllMichinoekiOutputData): void
}

export interface FindAllMichinoekiUseCase {
  execute(
    input: FindAllMichinoekiInputData
  ): Promise<FindAllMichinoekiOutputData>
}
