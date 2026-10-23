const stopWords = new Set([
  'the', 'a', 'an', 'and', 'or', 'for', 'with', 'from', 'into', 'to', 'of', 'in', 'on', 'at', 'by', 'as', 'is', 'are', 'be', 'this', 'that', 'these', 'those', 'your', 'our', 'we', 'you', 'they', 'them', 'their', 'his', 'her', 'its', 'it', 'i', 'me', 'my', 'mine', 'we', 'us', 'our', 'have', 'has', 'had', 'will', 'would', 'should', 'could', 'can', 'may', 'might', 'about', 'after', 'before', 'through', 'during', 'over', 'under', 'between', 'within', 'using', 'work', 'works', 'working', 'team', 'teams', 'company', 'role', 'responsibilities', 'experience'
]);

function normalizeText(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractKeywords(text) {
  const tokens = normalizeText(text).split(' ');
  const keywords = new Set();

  tokens.forEach((token) => {
    if (!token || token.length < 3 || stopWords.has(token)) return;
    keywords.add(token);
  });

  return [...keywords];
}

function getRelevantKeywords(jobDescription) {
  const keywords = extractKeywords(jobDescription);
  return keywords.slice(0, 12);
}

function buildSuggestions(missingKeywords, score) {
  const suggestions = [];

  if (score < 75) {
    suggestions.push('Strengthen your summary with the key responsibilities and outcomes from the job description.');
  }

  if (missingKeywords.length > 0) {
    suggestions.push(`Add keywords such as ${missingKeywords.slice(0, 4).join(', ')} to align your resume with the role.`);
  }

  suggestions.push('Quantify achievements with numbers, scope, and measurable impact to improve ATS relevance.');
  suggestions.push('Use consistent section headings like Experience, Skills, Projects, and Education for better parsing.');

  return suggestions.slice(0, 4);
}

function analyzeResumeAgainstJob(resume, jobDescription = '') {
  const resumeText = [
    resume.personalInfo?.fullName,
    resume.personalInfo?.summary,
    resume.personalInfo?.location,
    resume.skills?.join(' '),
    ...(resume.experience || []).map((exp) => [exp.title, exp.company, exp.description, (exp.bullets || []).join(' ')].join(' ')),
    ...(resume.projects || []).map((project) => [project.title, project.description, (project.bullets || []).join(' ')].join(' ')),
    ...(resume.education || []).map((edu) => [edu.degree, edu.school, edu.field].join(' ')),
    resume.achievements?.join(' '),
    resume.certifications?.join(' '),
  ].join(' ');

  const normalizedResume = normalizeText(resumeText);
  const normalizedJob = normalizeText(jobDescription);

  const jobKeywords = getRelevantKeywords(normalizedJob || '');
  const resumeKeywords = extractKeywords(normalizedResume || '');

  const matching = jobKeywords.filter((keyword) => resumeKeywords.includes(keyword));
  const missing = jobKeywords.filter((keyword) => !resumeKeywords.includes(keyword));

  const coverage = jobKeywords.length ? (matching.length / jobKeywords.length) * 100 : 0;
  const score = Math.min(99, Math.max(35, Math.round((coverage * 0.7) + (resume.personalInfo?.summary ? 15 : 0) + 10)));

  return {
    score: score,
    matchingKeywords: matching,
    missingKeywords: missing,
    suggestions: buildSuggestions(missing, score),
    estimatedLabel: 'Estimated ATS compatibility score',
  };
}

module.exports = { analyzeResumeAgainstJob };
