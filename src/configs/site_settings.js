import logoImage from 'assets/united_logo.png';
import autoBidLogo from 'assets/autobid_logo.png';

const autoBidSiteSettings={
    title:"AutoBid",
    logo:autoBidLogo.src
}
const unitedSiteSettings={
    title:"United Used Cars",
    logo:logoImage.src
}

export const siteSettings = (type)=>{
   const site_name=  process.env.NEXT_PUBLIC_SITE_NAME;
   switch(site_name){
       case 'pgl_autobid':
           return autoBidSiteSettings[type];
       case 'pgl_united':
           return unitedSiteSettings[type];
       default:
           return unitedSiteSettings[type];
   }
}