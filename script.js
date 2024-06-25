$(document).ready(function() {
  
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle'); //imp
});

$(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if (window.scrollY > 60) {
        document.querySelector('#scroll-top').classList.add('active');
    } else {
        document.querySelector('#scroll-top').classList.remove('active');
    }

    // scroll spy
    $('section').each(function () {
        let height = $(this).height();
        let offset = $(this).offset().top - 200;
        let top = $(window).scrollTop();
        let id = $(this).attr('id');

        if (top > offset && top < offset + height) {
            $('.navbar ul li a').removeClass('active');
            $('.navbar').find(`[href="#${id}"]`).addClass('active');
        }
    });
});

    // Show/hide scroll-up button based on scroll position
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('#scrollUpBtn').fadeIn();
      } else {
        $('#scrollUpBtn').fadeOut();
      }
    });
  
    // Scroll to top when the button is clicked
    $('#scrollUpBtn').click(function() {
      $('html, body').animate({ scrollTop: 0 }, 600);
      return false;
    });

    
      // <!-- emailjs to mail contact form data -->
      $("#contact-form").submit(function (event) {
        emailjs.init("MncDYCBhyoqVcP-9F");

        emailjs.sendForm('service_f43o92h', 'template_yjv0nbn', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->
  });
  
  document.addEventListener("DOMContentLoaded", async function () {
    const certificatesContainer = document.getElementById("certificatesContainer");
  
    // Fetch certificates data from certificates.json
    const certificatesData = await fetchData("certificates");
  
    // Function to create a certificate box
    function createCertificateBox(certificate) {
      const box = document.createElement("div");
      box.className = "box";
  
      const img = document.createElement("img");
      img.src = certificate.image;
      img.alt = "Certificate Image";
  
      const content = document.createElement("div");
      content.className = "content";
  

      // const title = document.createElement("h3");
      // title.textContent = certificate.title;
  
      // const description = document.createElement("p");
      // description.textContent = certificate.description;
  
      // content.appendChild(title);
      // content.appendChild(description);
  
      box.appendChild(img);
    //   box.appendChild(content);
  
      return box;
    }
  
    // Render certificates
    certificatesData.forEach(function (certificate) {
      const certificateBox = createCertificateBox(certificate);
      certificatesContainer.appendChild(certificateBox);
    });
  });
  
  document.addEventListener("DOMContentLoaded", async function () {
    const skillsContainer = document.getElementById("skillsContainer");
  
    // Fetch skills data from skills.json
    const skillsData = await fetchData("skills");
  
    // Function to create a skill box
    function createSkillBox(skill) {
      const bar = document.createElement("div");
      bar.className = "bar";
  
      const info = document.createElement("div");
      info.className = "info";
  
      const img = document.createElement("img");
      img.src = skill.icon;
      img.alt = skill.name;
  
      const span = document.createElement("span");
      span.textContent = skill.name;
  
      info.appendChild(img);
      info.appendChild(span);
      bar.appendChild(info);
  
      return bar;
    }
  
    // Render skills
    skillsData.forEach(function (skill) {
      const skillBox = createSkillBox(skill);
      skillsContainer.appendChild(skillBox);
    });
  });
  
  //projects
  document.addEventListener("DOMContentLoaded", async function () {
    const projectsContainer = document.getElementById("projectsContainer");
     // Inject CSS dynamically
     const style = document.createElement('style');
     style.innerHTML = `
     
       .btn {
         line-height: 1;
         display: inline-block;
         padding: 1.2rem 2rem;
         border-radius: 0.5rem;
         font-size: 1.3rem;
         color: #fff;
         background: rgb(12, 12, 12);
         transition: background 0.3s ease;
         text-align: center;
         white-space: nowrap;
         margin-right: 1rem; /* Ensure spacing */
       }
 
       .btn:hover {
         background: #310ae0f5;
       }
 
       .btn i {
         margin-right: 0.5rem;
       }
     `;
     document.head.appendChild(style);

  
    // Fetch projects data from projects.json
    const projectsData = await fetchData("projects");
  
 // Function to create a project box
 function createProjectBox(project) {
  const box = document.createElement("div");
  box.className = "box tilt";

  const img = document.createElement("img");
  img.draggable = false;
  img.src = project.image;
  img.alt = "Project Image";

  const content = document.createElement("div");
  content.className = "content";

  const tag = document.createElement("div");
  tag.className = "tag";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const desc = document.createElement("div");
  desc.className = "desc";

  const descText = document.createElement("p");
  descText.textContent = project.description;

  const btns = document.createElement("div");
  btns.className = "btns";

  const viewBtn = document.createElement("a");
  viewBtn.href = project.liveLink;
  viewBtn.target = "_blank";
  viewBtn.className = "btn";
  viewBtn.innerHTML = `<i class="fas fa-eye"></i> View Project`;

  const codeBtn = document.createElement("a");
  codeBtn.href = project.codeLink;
  codeBtn.target = "_blank";
  codeBtn.className = "btn";
  codeBtn.innerHTML = `<i class="fas fa-code"></i> View Code`;

  // Appending elements
  tag.appendChild(title);
  desc.appendChild(descText);
  btns.appendChild(viewBtn);
  btns.appendChild(codeBtn);
  content.appendChild(tag);
  content.appendChild(desc);
  content.appendChild(btns);
  box.appendChild(img);
  box.appendChild(content);

  return box;
}
  
     // Render projects
  projectsData.forEach(function (project) {
    const projectBox = createProjectBox(project);
    projectsContainer.appendChild(projectBox);
  });
});
  
  
  // Fetch data function for both skills and certificates
  async function fetchData(type) {
    try {
      const response = await fetch(`${type}.json`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${type} data: ${error.message}`);
      return [];
    }
  }
  
