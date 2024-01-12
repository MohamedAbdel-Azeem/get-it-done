import lightLogo from "./assets/images/logo-light.svg";
import darkLogo from "./assets/images/logo-dark.svg";
import lightModeLogo from "./assets/images/light-mode.svg";
import nightModeLogo from "./assets/images/night-mode.svg";

export function createTopBar(){
    const topBar = document.createElement('div');
    const title = document.createElement('h1');
    const span = document.createElement('span');
    const logoImg = document.createElement('img');
    const modeImg = document.createElement('img');
    const switchModeButton = document.createElement('button');


    topBar.id = 'top-bar';
    topBar.className = 'w-full bg-slate-100 dark:bg-indigo-900 flex flex-row space-x-4 items-center justify-center max-md:start';
    title.className =  'text-5xl text-slate-950 dark:text-slate-50 max-md:text-2xl transition-all duration-500';
    span.className = 'text-6xl text-green-600 dark:text-green-400 max-md:text-3xl';
    title.textContent = 'Get it ';
    span.textContent = 'Done';
    title.style.fontFamily = 'headingText';

    logoImg.src = lightLogo;
    logoImg.className = 'w-[45px] max-md:w-[25px]';
    
    switchModeButton.className = 'w-[45px] max-md:w-[25px] absolute right-[80px] max-md:right-[30px] cursor-pointer';
    modeImg.src = nightModeLogo;
    modeImg.className = 'w-[45px] max-md:w-[25px] cursor-pointer';

    switchModeButton.appendChild(modeImg);

    switchModeButton.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    modeImg.src = document.documentElement.classList.contains('dark') ? lightModeLogo : nightModeLogo;
    logoImg.src = document.documentElement.classList.contains('dark') ? darkLogo : lightLogo;
    });

    title.appendChild(span);
    topBar.appendChild(title);
    topBar.appendChild(logoImg);
    topBar.appendChild(switchModeButton);  
    return topBar;
}