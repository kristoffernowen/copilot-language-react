export type GetAllNounsQueryDto = {
  id: string
  singularForm: string
}

export type GetVerbQueryDto = {
  id: string
  presentTense: string
}

export type DisplayBasicSentenceQuery = {
  Tense: 'present' | 'future' | 'perfect' | 'past'
  StatementOrQuestion: 'statement' | 'question'
  SubjectId: string
  SubjectGrammaticalNumber: 'singular' | 'plural'
  SubjectDefiniteness: 'indefinite' | 'definite'
  PredicateId: string
  PredicatePresentTense?: string
  PredicateVerbConjugation?: string
}

export type DisplayBasicSentenceDto = {
  tense: string
  statementOrQuestion: string
  displaySentence: string
  subjectId: string
  subjectGrammaticalNumber: string
  subjectDefiniteness: string
  subjectDisplayForm: string
  predicateId: string
  predicatePresentTense: string
  predicateDisplayForm: string
  predicateVerbConjugation: string
  objectId: string | null
  objectGrammaticalNumber: string | null
  objectDefiniteness: string | null
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || 'https://localhost:7217/api'

class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const jsonHeaders = {
  'Content-Type': 'application/json',
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...jsonHeaders,
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new ApiError(
      errorText || `Anrop mot ${path} misslyckades med status ${response.status}.`,
      response.status,
    )
  }

  return (await response.json()) as T
}

function readString(source: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'string' && value.length > 0) {
      return value
    }
  }

  return ''
}

function readNullableString(
  source: Record<string, unknown>,
  ...keys: string[]
): string | null {
  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'string') {
      return value
    }

    if (value === null) {
      return null
    }
  }

  return null
}

export async function getNouns(): Promise<GetAllNounsQueryDto[]> {
  const data = await fetchJson<Array<Record<string, unknown>>>('/noun', {
    method: 'GET',
  })

  return data
    .map((item) => ({
      id: readString(item, 'id', 'Id'),
      singularForm: readString(item, 'singularForm', 'SingularForm'),
    }))
    .filter((item) => item.id && item.singularForm)
}

export async function getVerbs(): Promise<GetVerbQueryDto[]> {
  const data = await fetchJson<Array<Record<string, unknown>>>('/verb', {
    method: 'GET',
  })

  return data
    .map((item) => ({
      id: readString(item, 'id', 'Id'),
      presentTense: readString(item, 'presentTense', 'PresentTense'),
    }))
    .filter((item) => item.id && item.presentTense)
}

export async function createSentence(
  payload: DisplayBasicSentenceQuery,
): Promise<DisplayBasicSentenceDto> {
  const data = await fetchJson<Record<string, unknown>>('/sentencecontent', {
    method: 'POST',
    body: JSON.stringify({
      ...payload,
      PredicatePresentTense: '',
      PredicateVerbConjugation: '',
    }),
  })

  return {
    tense: readString(data, 'tense', 'Tense'),
    statementOrQuestion: readString(data, 'statementOrQuestion', 'StatementOrQuestion'),
    displaySentence: readString(data, 'displaySentence', 'DisplaySentence'),
    subjectId: readString(data, 'subjectId', 'SubjectId'),
    subjectGrammaticalNumber: readString(
      data,
      'subjectGrammaticalNumber',
      'SubjectGrammaticalNumber',
    ),
    subjectDefiniteness: readString(data, 'subjectDefiniteness', 'SubjectDefiniteness'),
    subjectDisplayForm: readString(data, 'subjectDisplayForm', 'SubjectDisplayForm'),
    predicateId: readString(data, 'predicateId', 'PredicateId'),
    predicatePresentTense: readString(data, 'predicatePresentTense', 'PredicatePresentTense'),
    predicateDisplayForm: readString(data, 'predicateDisplayForm', 'PredicateDisplayForm'),
    predicateVerbConjugation: readString(
      data,
      'predicateVerbConjugation',
      'PredicateVerbConjugation',
    ),
    objectId: readNullableString(data, 'objectId', 'ObjectId'),
    objectGrammaticalNumber: readNullableString(
      data,
      'objectGrammaticalNumber',
      'ObjectGrammaticalNumber',
    ),
    objectDefiniteness: readNullableString(data, 'objectDefiniteness', 'ObjectDefiniteness'),
  }
}
