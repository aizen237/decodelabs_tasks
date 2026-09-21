const API_URL = 'http://localhost:5000/api/applications';

const funnelBar = document.getElementById('funnelBar');
const funnelCaption = document.getElementById('funnelCaption');
const applicationsList = document.getElementById('applicationsList');
const emptyState = document.getElementById('emptyState');
const listCount = document.getElementById('listCount');
const statusMessage = document.getElementById('statusMessage');

const openFormBtn = document.getElementById('openFormBtn');
const cancelFormBtn = document.getElementById('cancelFormBtn');
const formPanel = document.getElementById('formPanel');
const applicationForm = document.getElementById('applicationForm');

openFormBtn.addEventListener('click', () => {
  formPanel.classList.toggle('open');
});

cancelFormBtn.addEventListener('click', () => {
  formPanel.classList.remove('open');
  applicationForm.reset();
});

function setStatusMessage(text, type = '') {
  statusMessage.textContent = text;
  statusMessage.className = 'status-message' + (type ? ' ' + type : '');
}

function animateCount(el, target) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 20));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current;
  }, 25);
}

function updateFunnel(applications) {
  const counts = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
  applications.forEach(app => {
    if (counts[app.status] !== undefined) counts[app.status]++;
  });

  const total = applications.length;

  document.querySelectorAll('.funnel-segment').forEach(segment => {
    const status = segment.dataset.status;
    const count = counts[status];
    const countEl = segment.querySelector('.funnel-count');
    animateCount(countEl, count);
    const growValue = total > 0 ? Math.max(count, 0.3) : 1;
    segment.style.flexGrow = growValue;
  });

  funnelCaption.textContent = total === 0
    ? 'No applications yet — log your first one below.'
    : `${total} total · tracking your pipeline`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderApplications(applications) {
  applicationsList.innerHTML = '';

  if (applications.length === 0) {
    emptyState.hidden = false;
    listCount.textContent = '0 total';
    return;
  }

  emptyState.hidden = true;
  listCount.textContent = `${applications.length} total`;

  applications.forEach(app => {
    const row = document.createElement('div');
    row.className = 'app-row';
    row.dataset.status = app.status;
    row.dataset.id = app.id;

    const main = document.createElement('div');
    main.className = 'app-main';

    const company = document.createElement('div');
    company.className = 'app-company';
    company.textContent = app.company;

    const role = document.createElement('div');
    role.className = 'app-role';
    role.textContent = app.role;

    const meta = document.createElement('div');
    meta.className = 'app-meta';
    meta.textContent = formatDate(app.date_applied);
    if (app.link) {
      meta.textContent += ' · ';
      const link = document.createElement('a');
      link.href = app.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'view posting';
      meta.appendChild(link);
    }

    main.appendChild(company);
    main.appendChild(role);
    main.appendChild(meta);

    const controls = document.createElement('div');
    controls.className = 'app-controls';

    const select = document.createElement('select');
    select.className = 'status-select';
    ['Applied', 'Interview', 'Offer', 'Rejected'].forEach(status => {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status;
      if (status === app.status) option.selected = true;
      select.appendChild(option);
    });
    select.addEventListener('change', () => updateStatus(app.id, select.value));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.setAttribute('aria-label', `Delete ${app.company} application`);
    deleteBtn.addEventListener('click', () => deleteApplication(app.id, row));

    controls.appendChild(select);
    controls.appendChild(deleteBtn);

    row.appendChild(main);
    row.appendChild(controls);
    applicationsList.appendChild(row);
  });
}

async function fetchApplications() {
  try {
    setStatusMessage('Loading applications…');
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    const data = await response.json();
    setStatusMessage('');
    renderApplications(data);
    updateFunnel(data);
  } catch (err) {
    console.error(err);
    setStatusMessage('Could not load applications. Is the backend server running?', 'error');
  }
}

applicationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newApp = {
    company: document.getElementById('companyInput').value.trim(),
    role: document.getElementById('roleInput').value.trim(),
    date_applied: document.getElementById('dateInput').value,
    link: document.getElementById('linkInput').value.trim(),
    notes: document.getElementById('notesInput').value.trim(),
    status: 'Applied'
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newApp)
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || `HTTP error, status: ${response.status}`);
    }

    applicationForm.reset();
    formPanel.classList.remove('open');
    setStatusMessage('Application saved.', 'success');
    fetchApplications();
  } catch (err) {
    console.error(err);
    setStatusMessage(err.message || 'Failed to save application.', 'error');
  }
});

async function updateStatus(id, newStatus) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    fetchApplications();
  } catch (err) {
    console.error(err);
    setStatusMessage('Failed to update status.', 'error');
  }
}

async function deleteApplication(id, rowEl) {
  try {
    rowEl.classList.add('removing');

    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    setTimeout(() => fetchApplications(), 200);
  } catch (err) {
    console.error(err);
    rowEl.classList.remove('removing');
    setStatusMessage('Failed to delete application.', 'error');
  }
}

fetchApplications();