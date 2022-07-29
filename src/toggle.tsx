export const toggle = () => {
  const nav: any = document.querySelector('.primary-navigation');
  const navToggle: any = document.querySelector('.mobile-nav-toggle')

  const visibility = nav.getAttribute('data-visible')
  if(visibility === 'false'){
    nav.setAttribute('data-visible', true)
    navToggle.setAttribute('aria-expanded', true)
  }else{
    nav.setAttribute('data-visible', false)
    navToggle.setAttribute('aria-expanded', false)
  }
}

