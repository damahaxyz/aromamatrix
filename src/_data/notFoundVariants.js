const locales = require('../../config/locales');

const translations = {
  en: {
    metaTitle: 'Page Not Found | AROMAMATRIX',
    metaDescription: 'The requested page could not be found. Return to the AROMAMATRIX homepage or contact our perfume manufacturing project team.',
    kicker: '404 · Page not found',
    title: 'This page is no longer available.',
    text: 'The address may be incorrect, or the page may have moved. Continue from our homepage or contact our team for help with your perfume project.',
    home: 'Return to homepage',
    contact: 'Contact our team'
  },
  es: {
    metaTitle: 'Página no encontrada | AROMAMATRIX',
    metaDescription: 'No se pudo encontrar la página solicitada. Vuelva al inicio de AROMAMATRIX o contacte con nuestro equipo de fabricación de perfumes.',
    kicker: '404 · Página no encontrada',
    title: 'Esta página ya no está disponible.',
    text: 'Es posible que la dirección sea incorrecta o que la página se haya movido. Vuelva al inicio o contacte con nuestro equipo para hablar de su proyecto de perfumería.',
    home: 'Volver al inicio',
    contact: 'Contactar con el equipo'
  },
  ar: {
    metaTitle: 'الصفحة غير موجودة | AROMAMATRIX',
    metaDescription: 'تعذر العثور على الصفحة المطلوبة. ارجع إلى الصفحة الرئيسية لـ AROMAMATRIX أو تواصل مع فريق مشاريع تصنيع العطور.',
    kicker: '404 · الصفحة غير موجودة',
    title: 'هذه الصفحة لم تعد متاحة.',
    text: 'قد يكون العنوان غير صحيح أو ربما تم نقل الصفحة. يمكنك العودة إلى الصفحة الرئيسية أو التواصل مع فريقنا لمناقشة مشروع العطور الخاص بك.',
    home: 'العودة إلى الصفحة الرئيسية',
    contact: 'تواصل مع فريقنا'
  },
  fr: {
    metaTitle: 'Page introuvable | AROMAMATRIX',
    metaDescription: 'La page demandée est introuvable. Revenez à l’accueil AROMAMATRIX ou contactez notre équipe de projets de fabrication de parfums.',
    kicker: '404 · Page introuvable',
    title: 'Cette page n’est plus disponible.',
    text: 'L’adresse est peut-être incorrecte ou la page a été déplacée. Revenez à l’accueil ou contactez notre équipe pour discuter de votre projet de parfum.',
    home: 'Retour à l’accueil',
    contact: 'Contacter notre équipe'
  }
};

module.exports = Object.values(locales)
  .filter(locale => locale.enabled && translations[locale.key])
  .map(locale => ({
    locale: locale.key,
    permalink: locale.path ? `/${locale.path}/404.html` : '/404.html',
    copy: translations[locale.key]
  }));
