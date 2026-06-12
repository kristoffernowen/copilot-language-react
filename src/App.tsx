import { useMemo } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Toaster, toast } from 'sonner'
import { z } from 'zod'
import {
  createSentence,
  getNouns,
  getVerbs,
  type DisplayBasicSentenceDto,
} from './api'
import './App.css'

const formSchema = z.object({
  SubjectId: z.string().min(1, 'Välj subjekt.'),
  SubjectGrammaticalNumber: z.enum(['singular', 'plural']),
  SubjectDefiniteness: z.enum(['definite', 'indefinite']),
  PredicateId: z.string().min(1, 'Välj predikat.'),
  Tense: z.enum(['present', 'future', 'perfect', 'past']),
  StatementOrQuestion: z.enum(['statement', 'question']),
})

type FormValues = z.infer<typeof formSchema>

const grammaticalNumberOptions = [
  { value: 'singular', label: 'Singular' },
  { value: 'plural', label: 'Plural' },
] as const

const definitenessOptions = [
  { value: 'definite', label: 'Bestämd' },
  { value: 'indefinite', label: 'Obestämd' },
] as const

const tenseOptions = [
  { value: 'present', label: 'Presens' },
  { value: 'future', label: 'Futurum' },
  { value: 'perfect', label: 'Perfekt' },
  { value: 'past', label: 'Imperfekt' },
] as const

const sentenceTypeOptions = [
  { value: 'statement', label: 'Påstående' },
  { value: 'question', label: 'Fråga' },
] as const

function App() {
  const nounsQuery = useQuery({
    queryKey: ['nouns'],
    queryFn: getNouns,
  })

  const verbsQuery = useQuery({
    queryKey: ['verbs'],
    queryFn: getVerbs,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const sentenceMutation = useMutation({
    mutationFn: createSentence,
    onError: (error: Error) => {
      toast.error('Kunde inte skapa mening.', {
        description: error.message,
      })
    },
  })

  const isLoadingLists = nounsQuery.isLoading || verbsQuery.isLoading
  const isDisabled = isLoadingLists || isSubmitting || sentenceMutation.isPending

  const listError = useMemo(() => {
    if (nounsQuery.error instanceof Error) {
      return nounsQuery.error.message
    }

    if (verbsQuery.error instanceof Error) {
      return verbsQuery.error.message
    }

    return ''
  }, [nounsQuery.error, verbsQuery.error])

  const onSubmit = handleSubmit(async (values) => {
    await sentenceMutation.mutateAsync(values)
  })

  const result: DisplayBasicSentenceDto | undefined = sentenceMutation.data

  return (
    <main className="app-shell">
      <Toaster position="top-right" richColors />

      <header className="hero">
        <p className="eyebrow">October Language</p>
        <h1>Bygg en mening</h1>
        <p className="subtitle">
          Välj ord och grammatik, skicka frågan och se din mening direkt.
        </p>
      </header>

      <section className="panel" aria-labelledby="form-heading">
        <h2 id="form-heading">Meningsinställningar</h2>

        {isLoadingLists && <p className="status">Hämtar ordlistor...</p>}

        {listError && (
          <p className="status status-error">Kunde inte hämta ordlistor: {listError}</p>
        )}

        <form className="sentence-form" onSubmit={onSubmit} noValidate>
          <div className="form-column">
            <label>
              Subjekt
              <select defaultValue="" {...register('SubjectId')} disabled={isDisabled}>
                <option value="" disabled>
                  Välj subjekt
                </option>
                {(nounsQuery.data ?? []).map((noun) => (
                  <option key={noun.id} value={noun.id}>
                    {noun.singularForm}
                  </option>
                ))}
              </select>
              {errors.SubjectId && <span className="error-text">{errors.SubjectId.message}</span>}
            </label>

            <label>
              Numerus för subjekt
              <select
                defaultValue=""
                {...register('SubjectGrammaticalNumber')}
                disabled={isDisabled}
              >
                <option value="" disabled>
                  Välj numerus
                </option>
                {grammaticalNumberOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.SubjectGrammaticalNumber && (
                <span className="error-text">{errors.SubjectGrammaticalNumber.message}</span>
              )}
            </label>

            <label>
              Bestämdhet för subjekt
              <select defaultValue="" {...register('SubjectDefiniteness')} disabled={isDisabled}>
                <option value="" disabled>
                  Välj bestämdhet
                </option>
                {definitenessOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.SubjectDefiniteness && (
                <span className="error-text">{errors.SubjectDefiniteness.message}</span>
              )}
            </label>
          </div>

          <div className="form-column">
            <label>
              Predikat
              <select defaultValue="" {...register('PredicateId')} disabled={isDisabled}>
                <option value="" disabled>
                  Välj predikat
                </option>
                {(verbsQuery.data ?? []).map((verb) => (
                  <option key={verb.id} value={verb.id}>
                    {verb.presentTense}
                  </option>
                ))}
              </select>
              {errors.PredicateId && <span className="error-text">{errors.PredicateId.message}</span>}
            </label>

            <label>
              Tempus
              <select defaultValue="" {...register('Tense')} disabled={isDisabled}>
                <option value="" disabled>
                  Välj tempus
                </option>
                {tenseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.Tense && <span className="error-text">{errors.Tense.message}</span>}
            </label>

            <label>
              Påstående eller fråga
              <select defaultValue="" {...register('StatementOrQuestion')} disabled={isDisabled}>
                <option value="" disabled>
                  Välj typ
                </option>
                {sentenceTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.StatementOrQuestion && (
                <span className="error-text">{errors.StatementOrQuestion.message}</span>
              )}
            </label>
          </div>

          <button type="submit" disabled={isDisabled}>
            {sentenceMutation.isPending ? 'Skickar...' : 'Skapa mening'}
          </button>
        </form>
      </section>

      <section className="panel result-panel" aria-live="polite">
        <h2>Resultat</h2>
        {!result && <p className="status">Inget resultat än. Skicka formuläret för att skapa en mening.</p>}

        {result && (
          <>
            <p className="sentence">{result.displaySentence}</p>
            <p className="result-meta">
              Tempus: <strong>{result.tense}</strong> | Typ: <strong>{result.statementOrQuestion}</strong>
            </p>
          </>
        )}
      </section>
    </main>
  )
}

export default App
