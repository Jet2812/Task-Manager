
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const taskList = document.getElementById('task-list');
  const feedback = document.getElementById('feedback');
  const mobileAddBtn = document.getElementById('mobile-add-btn');

  let tasks = [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const dueDate = document.getElementById('due-date').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    const task = { id: Date.now(), title, dueDate, description, status };
    tasks.push(task);
    form.reset();
    displayFeedback('Task added successfully!');
    renderTasks();
  });

  function displayFeedback(msg) {
    feedback.textContent = msg;
    setTimeout(() => feedback.textContent = '', 3000);
  }

  function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

    filtered.forEach(task => {
      const card = document.createElement('div');
      card.className = `task-card ${task.status === 'completed' ? 'completed' : ''}`;
      card.innerHTML = \`
        <h3>\${task.title}</h3>
        <p>Due: \${task.dueDate}</p>
        <p>\${task.description}</p>
        <div class="task-actions">
          <button onclick="editTask(\${task.id})">✎</button>
          <button onclick="deleteTask(\${task.id})">🗑️</button>
        </div>
      \`;
      taskList.appendChild(card);
    });
  }

  document.querySelectorAll('#filters button').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      renderTasks(filter);
    });
  });

  window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    displayFeedback('Task deleted.');
    renderTasks();
  };

  window.editTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      document.getElementById('title').value = task.title;
      document.getElementById('due-date').value = task.dueDate;
      document.getElementById('description').value = task.description;
      document.getElementById('status').value = task.status;
      tasks = tasks.filter(t => t.id !== id);
      displayFeedback('Edit and submit changes.');
    }
  };

  mobileAddBtn.addEventListener('click', () => {
    document.getElementById('title').focus();
  });

  renderTasks();
});
