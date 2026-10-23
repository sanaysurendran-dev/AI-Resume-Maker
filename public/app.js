const state = {
  token: localStorage.getItem('resumeai-token') || '',
  user: JSON.parse(localStorage.getItem('resumeai-user') || 'null'),
  resumes: [],
  activeResumeId: null,
  view: 'landing',
  authMode: 'login',
  atsJobDescription: '',
};

const app = document.getElementById('app');

function render() {
  const loggedIn = Boolean(state.token && state.user);
  const activeResume = state.activeResume || {};
  const personalInfo = activeResume.personalInfo || {};
  const experience = activeResume.experience || [];
  const education = activeResume.education || [];
  const projects = activeResume.projects || [];
  const certifications = activeResume.certifications || [];

  app.innerHTML = `
    <header class="navbar">
      <div class="container navbar-inner">
        <div class="logo">
          <div class="logo-mark"><span>R</span></div>
          <span>ResumeAI</span>
        </div>
        <nav class="nav-links">
          <a href="#features">Features</a>
          <a href="#templates">Templates</a>
          <a href="#dashboard">Dashboard</a>
        </nav>
        <button class="nav-btn ${loggedIn ? 'primary' : ''}" id="nav-action">
          ${loggedIn ? 'Dashboard' : 'Get Started'}
        </button>
      </div>
    </header>

    ${state.view === 'landing' ? `
      <main>
        <section class="hero">
          <div class="container hero-grid">
            <div>
              <div class="badge">✨ Smart ATS optimization for top-tier roles</div>
              <h1>Build better resumes with <span class="gradient-text">ResumeAI</span></h1>
              <p class="lead">
                Create polished, ATS-friendly CVs, compare them to job descriptions, and unlock clearer interview opportunities with real-time keyword intelligence.
              </p>
              <div class="actions">
                <button class="primary-btn" id="hero-start">Start building</button>
                <button class="secondary-btn" id="hero-demo">See dashboard</button>
              </div>
              <div class="hero-stats">
                <div class="stat"><strong>92%</strong><span>ATS fit</span></div>
                <div class="stat"><strong>3</strong><span>Templates</span></div>
                <div class="stat"><strong>1-click</strong><span>PDF export</span></div>
              </div>
            </div>
            <div class="preview-card">
              <div class="preview-window">
                <div class="window-bar"><span></span><span></span><span></span></div>
                <div class="resume-surface">
                  <div class="resume-header">
                    <h3>Amelia Hart</h3>
                    <span class="score-pill">ATS 94</span>
                  </div>
                  <div class="resume-mini-layout">
                    <div class="resume-left">
                      <div class="label">Profile</div>
                      <p>Product strategy leader driving SaaS growth and operational clarity.</p>
                      <div class="label">Skills</div>
                      <p>Product strategy, SQL, AI, analytics, leadership</p>
                    </div>
                    <div class="resume-right">
                      <div class="label">Experience</div>
                      <ul>
                        <li>Scaled product roadmap and experimentation</li>
                        <li>Improved growth efficiency with AI-led dashboards</li>
                        <li>Led broader cross-functional execution</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section" id="features">
          <div class="container">
            <div class="section-head">
              <h2>Built for serious job seekers</h2>
              <p>Everything you need to write, optimize, and present a premium resume that stands out to recruiters and hiring systems.</p>
            </div>
            <div class="feature-grid">
              <article class="feature-card">
                <div class="feature-icon">✓</div>
                <h3>ATS-Friendly Resume Builder</h3>
                <p>Build a clear, structured resume that hiring systems can scan accurately.</p>
              </article>
              <article class="feature-card">
                <div class="feature-icon">✦</div>
                <h3>AI Resume Suggestions</h3>
                <p>Get practical suggestions that sharpen your summary, skills, and experience.</p>
              </article>
              <article class="feature-card">
                <div class="feature-icon">◎</div>
                <h3>Job Match / ATS Score</h3>
                <p>Compare your resume with a job description and see matching and missing keywords.</p>
              </article>
              <article class="feature-card">
                <div class="feature-icon">▤</div>
                <h3>Multiple Resume Versions</h3>
                <p>Keep tailored versions ready for different roles, industries, and career goals.</p>
              </article>
              <article class="feature-card">
                <div class="feature-icon">in</div>
                <h3>LinkedIn &amp; GitHub Integration</h3>
                <p>Keep your professional profiles visible alongside your essential contact details.</p>
              </article>
              <article class="feature-card">
                <div class="feature-icon">↓</div>
                <h3>PDF Resume Download</h3>
                <p>Print or save a polished, readable copy ready to send with your next application.</p>
              </article>
            </div>
          </div>
        </section>

        <section class="section" id="templates">
          <div class="container">
            <div class="section-head">
              <h2>Professional templates</h2>
              <p>Choose a premium structure designed for clarity, modern hiring teams, and ATS parsing.</p>
            </div>
            <div class="template-grid">
              <article class="template-card">
                <span class="badge">01</span>
                <h3>Modern</h3>
                <p>Polished hierarchy with a contemporary accent for digital-first roles.</p>
                <div class="template-preview modern-preview"><div class="preview-bar"></div><div class="preview-bars"><span></span><span></span><span></span></div></div>
                <button class="ghost-btn use-template" type="button" data-template="modern">Use Template</button>
              </article>
              <article class="template-card">
                <span class="badge">02</span>
                <h3>Professional</h3>
                <p>Balanced sections and confident spacing for business and leadership roles.</p>
                <div class="template-preview professional-preview"><div class="preview-bar"></div><div class="preview-bars"><span></span><span></span><span></span></div></div>
                <button class="ghost-btn use-template" type="button" data-template="professional">Use Template</button>
              </article>
              <article class="template-card">
                <span class="badge">03</span>
                <h3>Minimal</h3>
                <p>Quiet typography and generous whitespace for focused, readable resumes.</p>
                <div class="template-preview minimal-preview"><div class="preview-bar"></div><div class="preview-bars"><span></span><span></span><span></span></div></div>
                <button class="ghost-btn use-template" type="button" data-template="minimal">Use Template</button>
              </article>
              <article class="template-card">
                <span class="badge">04</span>
                <h3>ATS-Friendly</h3>
                <p>Direct structure with strong scan paths and no distracting visual elements.</p>
                <div class="template-preview ats-preview"><div class="preview-bar"></div><div class="preview-bars"><span></span><span></span><span></span></div></div>
                <button class="ghost-btn use-template" type="button" data-template="ats-friendly">Use Template</button>
              </article>
              <article class="template-card">
                <span class="badge">05</span>
                <h3>Creative</h3>
                <p>Distinctive color blocking with a clean content structure recruiters can follow.</p>
                <div class="template-preview creative-preview"><div class="preview-bar"></div><div class="preview-bars"><span></span><span></span><span></span></div></div>
                <button class="ghost-btn use-template" type="button" data-template="creative">Use Template</button>
              </article>
            </div>
          </div>
        </section>

        <section class="section" id="dashboard">
          <div class="container">
            <div class="dashboard-shell">
              <div class="dashboard-grid">
                <div class="data-list">
                  <div class="data-row">
                    <div>
                      <strong>Resume dashboard</strong>
                      <span>Portfolio-ready workspace</span>
                    </div>
                    <span class="pill">Live</span>
                  </div>
                  <div class="data-row">
                    <div>
                      <strong>Job match scoring</strong>
                      <span>Estimated ATS compatibility score</span>
                    </div>
                    <span class="pill">AI-assisted</span>
                  </div>
                  <div class="data-row">
                    <div>
                      <strong>Resume library</strong>
                      <span>Save multiple versions</span>
                    </div>
                    <span class="pill">3 templates</span>
                  </div>
                  <div class="data-row linkedin-row">
                    <div class="linkedin-content">
                      <span class="linkedin-icon" aria-hidden="true">in</span>
                      <div>
                        <strong>LinkedIn Profile</strong>
                        <span>Add your LinkedIn profile to your resume</span>
                        <input id="linkedin-url" class="linkedin-input hidden" type="url" placeholder="https://linkedin.com/in/your-name" />
                      </div>
                    </div>
                    <button class="linkedin-btn" id="add-linkedin" type="button">Add LinkedIn</button>
                  </div>
                </div>
                <div class="auth-card">
                  <h3>Ready to launch your next application?</h3>
                  <p>Sign in to manage your resume library and compare your profile to any role description.</p>
                  <div class="actions">
                    <button class="primary-btn" id="landing-login">Login</button>
                    <button class="ghost-btn" id="landing-register">Register</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    ` : ''}

    ${!loggedIn && state.view === 'auth' ? `
      <main class="section">
        <div class="container auth-wrap">
          <div class="auth-card">
            <div class="badge">Secure access</div>
            <h3>${state.authMode === 'login' ? 'Welcome back' : 'Create your account'}</h3>
            <p>${state.authMode === 'login' ? 'Access your resume dashboard and continue optimizing your next application.' : 'Start building portfolio-ready resumes with ATS-driven feedback.'}</p>
            <form id="auth-form" class="form-grid">
              ${state.authMode === 'register' ? `
                <div class="input-group">
                  <label for="name">Full name</label>
                  <input id="name" name="name" type="text" placeholder="Alex Morgan" required />
                </div>
              ` : ''}
              <div class="input-group">
                <label for="email">Email address</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div class="input-group">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
              <button class="primary-btn" type="submit">${state.authMode === 'login' ? 'Login' : 'Register'}</button>
              <button class="ghost-btn" type="button" id="toggle-auth-mode">
                ${state.authMode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
              </button>
            </form>
          </div>

          <div class="auth-card">
            <div class="badge">Why ResumeAI</div>
            <h3>AI-powered resume clarity</h3>
            <p>Increase application readiness with data-backed keyword matching, clean structure, and strong presentation.</p>
            <div class="data-list" style="margin-top:20px;">
              <div class="data-row"><div><strong>Keyword coverage</strong><span>Skill alignment</span></div><span class="pill">Live</span></div>
              <div class="data-row"><div><strong>Resume versions</strong><span>Track multiple drafts</span></div><span class="pill">3+ saved</span></div>
              <div class="data-row"><div><strong>Professional design</strong><span>ATS-friendly templates</span></div><span class="pill">Premium</span></div>
            </div>
          </div>
        </div>
      </main>
    ` : ''}

    ${loggedIn && state.view === 'dashboard' ? `
      <main class="section">
        <div class="container dashboard-shell">
          <div class="section-head">
            <div>
              <div class="badge">Dashboard</div>
              <h2 style="margin-top:16px;">Welcome back, ${state.user.name}</h2>
            </div>
            <div class="actions">
              <button class="primary-btn" id="new-resume">+ New resume</button>
              <button class="ghost-btn" id="logout-btn">Logout</button>
            </div>
          </div>
          <div class="dashboard-grid">
            <div class="auth-card">
              <h3>My resumes</h3>
              <div id="resume-list" class="data-list"></div>
            </div>
            <div class="auth-card">
              <h3>Resume editor</h3>
              <form id="resume-form" class="form-grid">
                <div class="input-group">
                  <label for="resume-title">Resume title</label>
                  <input id="resume-title" name="title" type="text" placeholder="Senior Product Manager" value="${state.activeResume?.title || ''}" />
                </div>
                <div class="input-group">
                  <label for="resume-template">Template</label>
                  <select id="resume-template" name="template">
                    <option value="modern" ${state.activeResume?.template === 'modern' ? 'selected' : ''}>Modern</option>
                    <option value="professional" ${state.activeResume?.template === 'professional' ? 'selected' : ''}>Professional</option>
                    <option value="executive" ${state.activeResume?.template === 'executive' ? 'selected' : ''}>Executive</option>
                    <option value="minimal" ${state.activeResume?.template === 'minimal' ? 'selected' : ''}>Minimal</option>
                    <option value="ats-friendly" ${state.activeResume?.template === 'ats-friendly' ? 'selected' : ''}>ATS-Friendly</option>
                    <option value="creative" ${state.activeResume?.template === 'creative' ? 'selected' : ''}>Creative</option>
                  </select>
                </div>
                <div class="input-group">
                  <label for="full-name">Full name</label>
                  <input id="full-name" name="fullName" type="text" value="${personalInfo.fullName || ''}" placeholder="Alex Morgan" />
                </div>
                <div class="form-grid form-grid-four">
                  <div class="input-group">
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" value="${personalInfo.email || ''}" placeholder="alex@example.com" />
                  </div>
                  <div class="input-group">
                    <label for="linkedin">LinkedIn</label>
                    <input id="linkedin" name="linkedin" type="url" value="${personalInfo.linkedin || ''}" placeholder="https://linkedin.com/in/yourname" />
                  </div>
                  <div class="input-group">
                    <label for="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" value="${personalInfo.phone || ''}" placeholder="+1 555 123 4567" />
                  </div>
                  <div class="input-group">
                    <label for="github">GitHub</label>
                    <input id="github" name="github" type="url" value="${personalInfo.github || ''}" placeholder="https://github.com/alex" />
                  </div>
                </div>
                <div class="input-group">
                  <label for="summary">Professional summary</label>
                  <textarea id="summary" name="summary" rows="4" placeholder="Tell recruiters what you do best...">${personalInfo.summary || ''}</textarea>
                </div>
                <div class="input-group">
                  <label for="skills">Skills</label>
                  <input id="skills" type="text" value="${(activeResume.skills || []).join(', ')}" placeholder="Product strategy, SQL, AI, leadership" />
                </div>
                <div class="editor-section">
                  <div class="editor-section-head"><h4>Experience / Internship</h4><button class="ghost-btn add-entry" type="button" data-section="experience">+ Add Experience</button></div>
                  <div id="experience-fields">${renderEntryFields('experience', experience)}</div>
                </div>
                <div class="editor-section">
                  <div class="editor-section-head"><h4>Education</h4><button class="ghost-btn add-entry" type="button" data-section="education">+ Add education</button></div>
                  <div id="education-fields">${renderEntryFields('education', education)}</div>
                </div>
                <div class="editor-section">
                  <div class="editor-section-head"><h4>Projects</h4><button class="ghost-btn add-entry" type="button" data-section="projects">+ Add project</button></div>
                  <div id="projects-fields">${renderEntryFields('projects', projects)}</div>
                </div>
                <div class="editor-section">
                  <div class="editor-section-head"><h4>Certifications</h4><button class="ghost-btn add-entry" type="button" data-section="certifications">+ Add certification</button></div>
                  <div id="certifications-fields">${renderCertificationFields(certifications)}</div>
                </div>
                <button class="primary-btn" type="submit">Save resume</button>
              </form>
            </div>
          </div>
          <div class="dashboard-grid" style="margin-top:22px;">
            <div class="auth-card">
              <h3>ATS compatibility</h3>
              <div class="input-group">
                <label for="job-description">Paste job description</label>
                <textarea id="job-description" rows="8" placeholder="Paste the target job description here...">${state.atsJobDescription}</textarea>
              </div>
              <button class="primary-btn" id="analyze-ats">Check ATS score</button>
              <div id="ats-results" class="data-list" style="margin-top:18px;"></div>
            </div>
            <div class="auth-card">
              <h3>Live resume preview</h3>
              <div class="resume-surface" style="margin-top:8px;">
                <div class="resume-header">
                  <h3>${personalInfo.fullName || 'Your Name'}</h3>
                  <span class="score-pill">ATS ${activeResume.atsAnalysis?.score || 0}</span>
                </div>
                <p class="resume-contact">${[personalInfo.email, personalInfo.linkedin, personalInfo.phone, personalInfo.github].filter(Boolean).join(' | ') || 'Add your contact details'}</p>
                <div class="resume-mini-layout">
                  <div class="resume-left">
                    <div class="label">Summary</div>
                    <p>${personalInfo.summary || 'Add a compelling summary...'}</p>
                    <div class="label">Skills</div>
                    <p>${(activeResume.skills || []).join(', ') || 'Add your key skills'}</p>
                    ${renderPreviewSection('Education', education, (entry) => `${entry.degree || 'Degree'}${entry.field ? `, ${entry.field}` : ''} - ${entry.school || 'School'}`)}
                    ${renderPreviewSection('Certifications', certifications, (entry) => entry)}
                  </div>
                  <div class="resume-right">
                    <div class="label">Experience / Internship</div>
                    <ul>
                      ${experience.map((exp) => `<li><strong>${exp.title || 'Role'}</strong> - ${exp.company || 'Company'}${exp.yearsExperience !== undefined && exp.yearsExperience !== '' ? ` (${exp.yearsExperience} ${Number(exp.yearsExperience) === 1 ? 'year' : 'years'})` : ''}${exp.description ? `<br>${exp.description}` : ''}</li>`).join('') || '<li>Add your experience to preview it here.</li>'}
                    </ul>
                    ${renderPreviewSection('Projects', projects, (entry) => `${entry.title || 'Project'}${entry.description ? ` - ${entry.description}` : ''}`)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    ` : ''}

    <footer class="footer container">© 2026 ResumeAI. Built for faster job applications and stronger ATS alignment.</footer>
  `;

  bindEvents();
  if (loggedIn && state.view === 'dashboard') {
    renderResumeList();
    renderAtsResult();
  }
}

function renderEntryFields(section, entries) {
  const fields = section === 'education'
    ? [['degree', 'Degree'], ['school', 'School'], ['field', 'Field of study'], ['grade', 'Grade']]
    : section === 'projects'
      ? [['title', 'Project name'], ['description', 'Description']]
      : [['title', 'Job title'], ['company', 'Company'], ['yearsExperience', 'Years of Experience'], ['description', 'Description']];

  return (entries.length ? entries : [{}]).map((entry) => `
    <div class="repeatable-entry" data-entry-section="${section}">
      <div class="entry-grid">
        ${fields.map(([name, label]) => `<div class="input-group ${['description', 'bullets'].includes(name) ? 'full-width' : ''}"><label>${label}</label>${name === 'description' ? `<textarea data-field="${name}" rows="3" placeholder="Describe your impact...">${entry[name] || ''}</textarea>` : name === 'bullets' ? `<input data-field="${name}" type="text" value="${(entry[name] || []).join(', ')}" placeholder="Built scalable workflows, Improved team efficiency" />` : `<input data-field="${name}" type="${name === 'yearsExperience' ? 'number' : 'text'}" ${name === 'yearsExperience' ? 'min="0" step="1"' : ''} value="${entry[name] ?? ''}" placeholder="${name === 'yearsExperience' ? '2 years' : label}" />`}</div>`).join('')}
      </div>
      <div class="entry-actions"><button class="ghost-btn remove-entry" type="button">Remove</button></div>
    </div>
  `).join('');
}

function renderCertificationFields(certifications) {
  return (certifications.length ? certifications : ['']).map((certification) => `
    <div class="repeatable-entry certification-entry"><input data-field="certification" type="text" value="${certification}" placeholder="Certification name and issuer" /><button class="ghost-btn remove-entry" type="button">Remove</button></div>
  `).join('');
}

function renderPreviewSection(title, entries, formatEntry) {
  if (!entries.length) return '';
  return `<div class="label">${title}</div><ul>${entries.map((entry) => `<li>${formatEntry(entry)}</li>`).join('')}</ul>`;
}

async function applyTemplate(template) {
  localStorage.setItem('resumeai-pending-template', template);

  if (!state.token || !state.user) {
    state.view = 'auth';
    state.authMode = 'login';
    render();
    return;
  }

  if (!state.activeResumeId) {
    state.view = 'dashboard';
    render();
    return;
  }

  const res = await fetch(`/api/resumes/${state.activeResumeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.token}`,
    },
    body: JSON.stringify({ template }),
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.message || 'Could not apply template');
    return;
  }

  state.activeResume = data.resume;
  state.resumes = state.resumes.map((resume) => resume._id === data.resume._id ? data.resume : resume);
  localStorage.removeItem('resumeai-pending-template');
  state.view = 'dashboard';
  render();
}

function bindEvents() {
  document.querySelectorAll('.add-entry').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.dataset.section;
      const container = document.getElementById(`${section}-fields`);
      if (section === 'projects' && container.querySelectorAll('.repeatable-entry').length >= 10) return;
      const entries = section === 'certifications' ? [''] : [{}];
      container.insertAdjacentHTML('beforeend', section === 'certifications'
        ? renderCertificationFields(entries)
        : renderEntryFields(section, entries));
      bindEntryControls(container);
      updateProjectAddButton();
    });
  });
  bindEntryControls(document.getElementById('resume-form'));
  updateProjectAddButton();

  document.getElementById('nav-action')?.addEventListener('click', () => {
    if (state.token && state.user) {
      state.view = 'dashboard';
      ensureResumeSelection();
      render();
    } else {
      state.view = 'auth';
      state.authMode = 'login';
      render();
    }
  });

  document.getElementById('hero-start')?.addEventListener('click', () => {
    if (state.token && state.user) {
      state.view = 'dashboard';
      render();
    } else {
      state.view = 'auth';
      state.authMode = 'register';
      render();
    }
  });

  document.getElementById('hero-demo')?.addEventListener('click', () => {
    state.view = 'dashboard';
    render();
  });

  document.querySelectorAll('.use-template').forEach((button) => {
    button.addEventListener('click', () => applyTemplate(button.dataset.template));
  });

  document.getElementById('landing-login')?.addEventListener('click', () => {
    state.view = 'auth';
    state.authMode = 'login';
    render();
  });

  document.getElementById('landing-register')?.addEventListener('click', () => {
    state.view = 'auth';
    state.authMode = 'register';
    render();
  });

  document.getElementById('add-linkedin')?.addEventListener('click', async () => {
    const input = document.getElementById('linkedin-url');
    const button = document.getElementById('add-linkedin');
    if (!input || !button) return;

    if (input.classList.contains('hidden')) {
      input.classList.remove('hidden');
      input.value = localStorage.getItem('resumeai-linkedin-profile') || '';
      button.textContent = 'Save LinkedIn';
      input.focus();
      return;
    }

    if (!input.checkValidity() || !input.value.trim()) {
      input.reportValidity();
      return;
    }

    const linkedin = input.value.trim();
    localStorage.setItem('resumeai-linkedin-profile', linkedin);

    if (state.token && state.activeResumeId && state.activeResume) {
      const res = await fetch(`/api/resumes/${state.activeResumeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({
          personalInfo: {
            ...(state.activeResume.personalInfo || {}),
            linkedin,
          },
        }),
      });

      if (!res.ok) {
        alert('Could not save your LinkedIn profile to this resume');
        return;
      }
    }

    button.textContent = 'LinkedIn Added';
  });

  document.getElementById('toggle-auth-mode')?.addEventListener('click', () => {
    state.authMode = state.authMode === 'login' ? 'register' : 'login';
    render();
  });

  document.getElementById('auth-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const payload = {
      name: document.getElementById('name')?.value || '',
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };

    const endpoint = state.authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || 'Authentication failed');
      return;
    }

    state.token = data.token;
    state.user = data.user;
    localStorage.setItem('resumeai-token', data.token);
    localStorage.setItem('resumeai-user', JSON.stringify(data.user));
    state.view = 'dashboard';
    await loadResumes();
    const pendingTemplate = localStorage.getItem('resumeai-pending-template');
    if (pendingTemplate && state.activeResumeId) {
      await applyTemplate(pendingTemplate);
    } else {
      render();
    }
  });

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    state.token = '';
    state.user = null;
    state.resumes = [];
    state.activeResumeId = null;
    localStorage.removeItem('resumeai-token');
    localStorage.removeItem('resumeai-user');
    state.view = 'landing';
    render();
  });

  document.getElementById('new-resume')?.addEventListener('click', async () => {
    const newResume = {
      title: 'New Resume',
      template: localStorage.getItem('resumeai-pending-template') || 'modern',
      personalInfo: {
        fullName: state.user.name,
        email: state.user.email,
        summary: 'Results-driven professional delivering measurable impact through strategy, execution, and communication.',
      },
      skills: ['Leadership', 'Communication', 'Strategy', 'Problem Solving'],
      experience: [{ title: 'Senior Specialist', company: 'Your Company', description: 'Led strategic initiatives and delivered measurable improvements.', bullets: ['Built scalable workflows', 'Improved team efficiency'] }],
      education: [],
      projects: [],
      certifications: [],
      achievements: [],
    };

    const res = await fetch('/api/resumes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify(newResume),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || 'Could not create resume');
      return;
    }

    state.activeResumeId = data.resume._id;
    state.activeResume = data.resume;
    localStorage.removeItem('resumeai-pending-template');
    state.resumes = [data.resume, ...state.resumes];
    render();
  });

  document.getElementById('resume-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!state.activeResumeId) return;

    const payload = {
      title: document.getElementById('resume-title').value,
      template: document.getElementById('resume-template').value,
      personalInfo: {
        fullName: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        linkedin: document.getElementById('linkedin').value,
        phone: document.getElementById('phone').value,
        github: document.getElementById('github').value,
        summary: document.getElementById('summary').value,
      },
      skills: document.getElementById('skills').value.split(',').map((item) => item.trim()).filter(Boolean),
      experience: collectEntries('experience'),
      education: collectEntries('education'),
      projects: collectEntries('projects'),
      certifications: [...document.querySelectorAll('#certifications-fields [data-field="certification"]')]
        .map((input) => input.value.trim()).filter(Boolean),
    };

    const res = await fetch(`/api/resumes/${state.activeResumeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || 'Resume update failed');
      return;
    }

    await loadResumes();
    render();
  });

  document.getElementById('analyze-ats')?.addEventListener('click', async () => {
    if (!state.activeResumeId) return;
    const jobDescription = document.getElementById('job-description').value;
    state.atsJobDescription = jobDescription;

    const res = await fetch(`/api/resumes/${state.activeResumeId}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify({ jobDescription }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || 'ATS analysis failed');
      return;
    }

    await loadResumes();
    render();
  });

  document.getElementById('job-description')?.addEventListener('input', (event) => {
    state.atsJobDescription = event.target.value;
  });
}

function bindEntryControls(container) {
  if (!container) return;
  container.querySelectorAll('.remove-entry').forEach((button) => {
    if (button.dataset.bound) return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      const entry = button.closest('.repeatable-entry');
      const entries = entry.parentElement.querySelectorAll('.repeatable-entry');
      const section = entry.dataset.entrySection;
      if (section === 'projects' || section === 'experience' || entries.length > 1) {
        entry.remove();
        updateProjectAddButton();
      } else {
        entry.querySelectorAll('input, textarea').forEach((field) => { field.value = ''; });
      }
    });
  });
}

function updateProjectAddButton() {
  const button = document.querySelector('.add-entry[data-section="projects"]');
  const container = document.getElementById('projects-fields');
  if (!button || !container) return;
  const atLimit = container.querySelectorAll('.repeatable-entry').length >= 10;
  button.disabled = atLimit;
  button.title = atLimit ? 'You can add up to 10 projects' : '';
}

function collectEntries(section) {
  return [...document.querySelectorAll(`#${section}-fields .repeatable-entry`)].map((entry) => {
    const result = {};
    entry.querySelectorAll('[data-field]').forEach((field) => {
      const value = field.value.trim();
      if (field.dataset.field === 'bullets') {
        result.bullets = value.split(',').map((bullet) => bullet.trim()).filter(Boolean);
      } else if (value || field.type === 'number') {
        result[field.dataset.field] = value;
      }
    });
    return result;
  }).filter((entry) => Object.keys(entry).length);
}

async function loadResumes() {
  if (!state.token) return;

  try {
    const res = await fetch('/api/resumes', {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });

    if (!res.ok) return;
    const data = await res.json();
    state.resumes = data.resumes || [];
    if (!state.activeResumeId && state.resumes[0]) {
      state.activeResumeId = state.resumes[0]._id;
    }
    if (state.activeResumeId) {
      const current = state.resumes.find((resume) => resume._id === state.activeResumeId);
      if (current) {
        state.activeResume = current;
      }
    }
  } catch (error) {
    console.error('Unable to load resumes', error);
  }
}

function ensureResumeSelection() {
  if (!state.resumes.length) return;
  if (!state.activeResumeId) {
    state.activeResumeId = state.resumes[0]._id;
  }
  state.activeResume = state.resumes.find((resume) => resume._id === state.activeResumeId) || state.resumes[0];
}

function renderResumeList() {
  const list = document.getElementById('resume-list');
  if (!list) return;

  if (!state.resumes.length) {
    list.innerHTML = '<div class="data-row"><div><strong>No resumes yet</strong><span>Create your first resume to begin.</span></div></div>';
    return;
  }

  list.innerHTML = state.resumes.map((resume) => `
    <button class="data-row" data-resume-id="${resume._id}" style="width:100%; text-align:left; cursor:pointer; background: ${resume._id === state.activeResumeId ? 'rgba(124,58,237,0.10)' : 'rgba(10,16,26,0.8)'};">
      <div>
        <strong>${resume.title}</strong>
        <span>${resume.template} template</span>
      </div>
      <div style="display:flex; gap:10px; align-items:center;">
        <span class="pill">${resume.atsAnalysis?.score ?? 0} ATS</span>
        <button class="ghost-btn" data-delete-id="${resume._id}" style="padding:8px 10px;">Delete</button>
      </div>
    </button>
  `).join('');

  list.querySelectorAll('[data-resume-id]').forEach((button) => {
    button.addEventListener('click', (event) => {
      if (event.target.closest('[data-delete-id]')) return;
      state.activeResumeId = button.dataset.resumeId;
      ensureResumeSelection();
      render();
    });
  });

  list.querySelectorAll('[data-delete-id]').forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.stopPropagation();
      const id = button.dataset.deleteId;
      const res = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${state.token}` },
      });
      if (res.ok) {
        state.resumes = state.resumes.filter((resume) => resume._id !== id);
        if (state.activeResumeId === id) {
          state.activeResumeId = state.resumes[0]?._id || null;
        }
        render();
      }
    });
  });
}

function renderAtsResult() {
  const container = document.getElementById('ats-results');
  if (!container) return;

  const resume = state.resumes.find((item) => item._id === state.activeResumeId);
  if (!resume || !resume.atsAnalysis) {
    container.innerHTML = `
      <div class="data-row">
        <div>
          <strong>Estimated ATS compatibility score</strong>
          <span>No analysis run yet. Paste a job description to compare.</span>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="data-row">
      <div>
        <strong>Estimated ATS compatibility score</strong>
        <span>${resume.atsAnalysis.score}% match</span>
      </div>
      <span class="pill">${resume.atsAnalysis.score}</span>
    </div>
    <div class="data-row">
      <div>
        <strong>Matching keywords</strong>
        <span>${(resume.atsAnalysis.matchingKeywords || []).join(', ') || 'No overlaps yet'}</span>
      </div>
    </div>
    <div class="data-row">
      <div>
        <strong>Missing keywords</strong>
        <span>${(resume.atsAnalysis.missingKeywords || []).join(', ') || 'No missing keywords found'}</span>
      </div>
    </div>
    <div class="data-row">
      <div>
        <strong>Suggestions</strong>
        <span>${(resume.atsAnalysis.suggestions || []).join(' • ')}</span>
      </div>
    </div>
  `;
}

async function bootstrap() {
  if (state.token && state.user) {
    state.view = 'dashboard';
    await loadResumes();
    ensureResumeSelection();
  }
  render();
}

bootstrap();
