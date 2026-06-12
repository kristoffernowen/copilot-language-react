## endpoints

All the ids will be Guids converted to strings. Frontend should call GetNouns and GetAllVerb
to get list of available ids and SingularForm or PresentTense, to list them for user to choose. This way ids will be correct and entries found.

basic url: https://localhost:7217/api

### Noun

/noun
GET GetNouns(): List<GetAllNounsQueryDto>
GET(id) GetNoun(string id): GetNounQueryDto

public class GetAllNounsQueryDto
{
public string SingularForm { get; set; } = null!;
public string Id { get; set; } = null!;
}

public class GetNounQueryDto
{
public string Id { get; set; } = null!;
public string SingularForm { get; set; } = null!;
public string DisplayForm { get; set; } = null!;
public string GrammaticalNumber { get; set; } = null!;
public string Definiteness { get; set; } = null!;
}

### Verb

/verb
GET GetAllVerb(): List<GetVerbQueryDto>
GET(id) GetVerb(string id): GetVerbByIdDto

public class GetVerbQueryDto
{
public string Id { get; set; } = null!;
public string PresentTense { get; set; } = null!;
}

public record GetVerbByIdDto
{
public string Id { get; set; } = null!;
public string PresentTense { get; set; } = null!;
public string DisplayForm { get; set; } = null!;
}

### SentenceContent

/sentencecontent
POST Create(DisplayBasicSentenceQuery): DisplayBasicSentenceDto

public class DisplayBasicSentenceQuery
{
public string Tense { get; set; } = null!; // accepts present || perfect || future || past
public string StatementOrQuestion { get; set; } = null!; // accepts statement || question

    public string SubjectId { get; set; } = null!;
    public string SubjectGrammaticalNumber { get; set; } = null!; // accepts singular || plural
    public string SubjectDefiniteness { get; set; } = null!; // accepts indefinite || definite
    public string PredicateId { get; set; } = null!;

}

public class DisplayBasicSentenceDto
{
public string Tense { get; set; } = null!;
public string StatementOrQuestion { get; set; } = null!;
public string DisplaySentence { get; set; } = null!;
public string SubjectId { get; set; } = null!;
public string SubjectGrammaticalNumber { get; set; } = null!;
public string SubjectDefiniteness { get; set; } = null!;
public string SubjectDisplayForm { get; set; } = null!;
public string PredicateId { get; set; } = null!;
public string PredicatePresentTense { get; set; } = null!;
public string PredicateDisplayForm { get; set; } = null!;

    public string PredicateVerbConjugation { get; set; } = null!;
    public string? ObjectId { get; set; }
    public string? ObjectGrammaticalNumber { get; set; }
    public string? ObjectDefiniteness { get; set; }

}
