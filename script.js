document.addEventListener('DOMContentLoaded', () => {
    // Variables generales
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainContent = document.getElementById('main-content');
    const addPatientBtn = document.getElementById('addPatientBtn');
    const addPatientModal = document.getElementById('addPatientModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const addPatientForm = document.getElementById('addPatientForm');
    const patientTableBody = document.querySelector('.patient-table tbody');
    const patientBadge = document.querySelector('.badge');
  
    // Función para formatear la fecha (añadido return)
    function formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  
    // Menu lateral (ejemplo, asegúrate de que el elemento "nav" exista)
    let menu_visible = false;
    let menu = document.getElementById("nav");
    function mostrarOcultarMenu() {
        if(menu_visible === false){
            menu.style.display = "block";
            menu_visible = true;
        } else {
            menu.style.display = "none";
            menu_visible = false;
        }
    }
    let links = document.querySelectorAll("nav a");
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.style.display = "none";
            menu_visible = false;
        });
    });
  
    // Ejemplo para crear barras (si aplica en esta página)
    function crearBarra(id_barra) {
        for(let i = 0; i <= 16; i++){
            let div = document.createElement("div");
            div.className = "e";
            id_barra.appendChild(div);
        }
    }
    // (Aquí se llamarían las funciones crearBarra y demás según corresponda)
  
    // Toggle Sidebar
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-minimized');
      mainContent.classList.toggle('content-expanded');
    });
  
    // Mostrar modal de "Nuevo Paciente"
    addPatientBtn.addEventListener('click', () => {
      console.log("Botón 'Nuevo Paciente' clickeado");
      addPatientModal.classList.add('active-modal');
    });
  
    // Cerrar modal y resetear formulario
    closeModalBtn.addEventListener('click', () => {
      addPatientModal.classList.remove('active-modal');
      addPatientForm.reset();
    });
    cancelBtn.addEventListener('click', () => {
      addPatientModal.classList.remove('active-modal');
      addPatientForm.reset();
    });
  
    // Procesar envío del formulario
    addPatientForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Obtener valores del formulario
      const name = document.getElementById('patientName').value;
      const documentValue = document.getElementById('patientDocument').value;
      const company = document.getElementById('patientCompany').value;
      const date = formatDate(document.getElementById('incidentDate').value);
      const status = document.getElementById('patientStatus').value;
  
      // Mapear el estado a texto
      let statusText = 'Activo';
      if (status === 'pending') statusText = 'Pendiente';
      if (status === 'closed') statusText = 'Cerrado';
  
      // Crear una nueva fila en la tabla
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${name}</td>
        <td>${documentValue}</td>
        <td>${company}</td>
        <td>${date}</td>
        <td><span class="status-pill status-${status}">${statusText}</span></td>
        <td>
          <div class="patient-actions">
            <a href="#" class="action-btn view"><i class="uil uil-eye"></i></a>
            <a href="#" class="action-btn edit"><i class="uil uil-edit"></i></a>
            <a href="#" class="action-btn delete"><i class="uil uil-trash-alt"></i></a>
          </div>
        </td>
      `;
      patientTableBody.insertBefore(newRow, patientTableBody.firstChild);
  
      // Actualizar contador de pacientes
      updatePatientCount();
  
      // Cerrar modal y resetear formulario
      addPatientModal.classList.remove('active-modal');
      addPatientForm.reset();
  
      // Agregar listeners para los nuevos botones de acción
      addActionButtonListeners(newRow);
    });
  
    // Función para actualizar contador de pacientes
    function updatePatientCount() {
      const patientCount = patientTableBody.querySelectorAll('tr').length;
      patientBadge.textContent = `${patientCount} pacientes`;
    }
  
    // Función para agregar listeners a botones de acción de una fila
    function addActionButtonListeners(row) {
      row.querySelector('.action-btn.view').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Ver detalles del paciente');
      });
      row.querySelector('.action-btn.edit').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Editar paciente');
      });
      row.querySelector('.action-btn.delete').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('¿Está seguro de eliminar este paciente?')) {
          row.remove();
          updatePatientCount();
        }
      });
    }
  
    // Inicializar acciones para los botones de la tabla existente
    function initializeTableActions() {
      document.querySelectorAll('.action-btn.view').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          alert('Ver detalles del paciente');
        });
      });
      document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          alert('Editar paciente');
        });
      });
      document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const row = this.closest('tr');
          if (confirm('¿Está seguro de eliminar este paciente?')) {
            row.remove();
            updatePatientCount();
          }
        });
      });
    }
    initializeTableActions();
  
    // Otras funcionalidades (por ejemplo, cálculo de edad y etapas) se pueden incluir aquí también
  
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const addPatientBtn = document.getElementById('addPatientBtn');
    const addPatientModal = document.getElementById('addPatientModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelBtn');
  
    // Abrir modal
    addPatientBtn.addEventListener('click', () => {
      console.log("Botón 'Nuevo Paciente' clickeado");
      addPatientModal.classList.add('active-modal');
    });
  
    // Cerrar modal
    closeModalBtn.addEventListener('click', () => {
      addPatientModal.classList.remove('active-modal');
    });
    
    // Cerrar modal al presionar Cancelar
    cancelBtn.addEventListener('click', () => {
      addPatientModal.classList.remove('active-modal');
    });
  });

  // Get DOM elements
const addPatientBtn = document.getElementById('addPatientBtn');
const addPatientModal = document.getElementById('addPatientModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const addPatientForm = document.getElementById('addPatientForm');

// Function to open modal
function openModal() {
  addPatientModal.classList.add('active-modal');
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Function to close modal
function closeModal() {
  addPatientModal.classList.remove('active-modal');
  document.body.style.overflow = 'auto'; // Enable scrolling again
  addPatientForm.reset(); // Reset form fields
  
  // Reset form sections to first tab
  document.querySelectorAll('.form-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById('generalData').classList.add('active');
  
  // Reset tab buttons
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector('[data-tab="generalData"]').classList.add('active');
}

// Event listeners
addPatientBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Close modal if clicked outside content
addPatientModal.addEventListener('click', (e) => {
  if (e.target === addPatientModal) {
    closeModal();
  }
});

// Tab navigation
document.querySelectorAll('.tab-btn').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and sections
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding section
    tab.classList.add('active');
    const targetSection = tab.getAttribute('data-tab');
    document.getElementById(targetSection).classList.add('active');
  });
});

// Next button navigation
document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const nextSection = btn.getAttribute('data-next');
    
    // Remove active class from all tabs and sections
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
    
    // Add active class to next tab and section
    document.querySelector(`[data-tab="${nextSection}"]`).classList.add('active');
    document.getElementById(nextSection).classList.add('active');
  });
});

// Previous button navigation
document.querySelectorAll('.prev-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const prevSection = btn.getAttribute('data-prev');
    
    // Remove active class from all tabs and sections
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
    
    // Add active class to previous tab and section
    document.querySelector(`[data-tab="${prevSection}"]`).classList.add('active');
    document.getElementById(prevSection).classList.add('active');
  });
});

// Form submission
addPatientForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Here you would typically collect form data and send to server
  // For demo purposes, we'll just log and close
  console.log('Form submitted');
  
  // You could add validation and AJAX submission here
  
  // Close modal after successful submission
  closeModal();
  
  // Optional: Add a notification or refresh patient list
  alert('Paciente agregado correctamente');
  // location.reload(); // Uncomment to refresh page
});

// Calculate age from birth date
const birthDateInput = document.getElementById('birthDate');
const ageInput = document.getElementById('patientAge');

birthDateInput.addEventListener('change', () => {
  if (birthDateInput.value) {
    const birthDate = new Date(birthDateInput.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    ageInput.value = age;
  }
});
  