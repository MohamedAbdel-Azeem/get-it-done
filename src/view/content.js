const global_common_style = 'bg-zinc-100 dark:bg-violet-950';

export function initialContent() {
    const content = document.createElement('div');
    content.id = 'content';
    content.className = `${global_common_style} pt-10 pb-4 px-14 max-md:px-4 max-md:pt-4 text-center flex flex-col justify-between`;


    const partOne = document.createElement('div');
    partOne.className = 'flex flex-col justify-center items-center space-y-8 px-16 max-md:px-2';

    const welcomeHeading = document.createElement('h1');
    welcomeHeading.textContent = 'Welcome to Get it Done !';
    welcomeHeading.className = 'text-3xl font-semibold mb-4 dark:text-slate-50';
    welcomeHeading.style.fontFamily = 'lowerHeaders';

    const description = document.createElement('p');
    description.innerHTML = 'Organize your tasks effortlessly with Get it Done. Stay productive by creating and managing projects, adding tasks with priorities and due dates, and effortlessly organizing your to-dos. Stay on top of upcoming deadlines.';
    description.className = 'text-xl max-md:text-lg text-gray-600 mb-6 text-slate-900 dark:text-slate-50';
    description.style.fontFamily = 'bodyText';

    partOne.appendChild(welcomeHeading);
    partOne.appendChild(description);

    const githubLink = document.createElement('p');
    githubLink.innerHTML = 'Check out My <a href="https://github.com/MohamedAbdel-Azeem" target="_blank" class="text-blue-500 underline">GitHub</a>.';
    githubLink.className = 'text-sm text-slate-600 dark:text-slate-200';

    content.appendChild(partOne);
    content.appendChild(githubLink);

    return content;
}


export function displayProjectContent(project) {
    const content = document.querySelector('#content');
    content.innerHTML = '';
    content.textContent = project.title;
    console.log(project);
}