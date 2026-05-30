export type AuthLanguage = "en" | "nl" | "fr" | "de";

type AuthCopy = {
  emailAlreadyInUse: string;
  userNotFound: string;
  wrongPassword: string;
  invalidCredential: string;
  invalidEmail: string;
  userDisabled: string;
  tooManyRequests: string;
  networkError: string;
  popupClosed: string;
  cancelledPopup: string;
  popupBlocked: string;
  requiresRecentLogin: string;
  weakPassword: string;
  operationNotAllowed: string;
  unauthorizedDomain: string;
  internalError: string;
  genericError: string;
};

const authCopyMap: Record<AuthLanguage, AuthCopy> = {
  nl: {
    emailAlreadyInUse: "Dit e-mailadres heeft al een account. Meld je aan.",
    userNotFound: "Geen account gevonden voor dit e-mailadres. Maak er hieronder een aan.",
    wrongPassword: "Onjuist wachtwoord. Probeer het opnieuw.",
    invalidCredential: "Onjuist e-mailadres of wachtwoord. Probeer het opnieuw.",
    invalidEmail: "Dat lijkt geen geldig e-mailadres.",
    userDisabled: "Dit account is uitgeschakeld. Neem contact op met support als je denkt dat dit een vergissing is.",
    tooManyRequests: "Te veel pogingen. Wacht even voordat je het opnieuw probeert.",
    networkError: "Netwerkfout. Controleer je verbinding en probeer het opnieuw.",
    popupClosed: "Het aanmeldvenster is gesloten. Probeer het opnieuw.",
    cancelledPopup: "Er is al een ander aanmeldvenster geopend.",
    popupBlocked: "Je browser heeft de aanmeldpopup geblokkeerd. Sta popups toe voor deze site en probeer het opnieuw.",
    requiresRecentLogin: "Om veiligheidsredenen moet je je opnieuw aanmelden voordat je doorgaat.",
    weakPassword: "Wachtwoord moet minimaal 6 tekens bevatten.",
    operationNotAllowed: "Deze aanmeldmethode is niet ingeschakeld in Firebase. Schakel Google Sign-In in onder Authentication > Sign-in method.",
    unauthorizedDomain: "Dit domein is niet geautoriseerd voor aanmelding. Voeg het toe onder Firebase Authentication > Settings > Authorized domains (bijv. growthkit.jcode.be).",
    internalError: "Aanmelding mislukt door een serverfout. Probeer het later opnieuw.",
    genericError: "Er is iets misgegaan. Probeer het opnieuw.",
  },
  en: {
    emailAlreadyInUse: "This email already has an account. Sign in instead.",
    userNotFound: "No account found for this email. Create one below.",
    wrongPassword: "Incorrect password. Please try again.",
    invalidCredential: "Incorrect email or password. Please try again.",
    invalidEmail: "That doesn't look like a valid email address.",
    userDisabled: "This account has been disabled. Contact support if you think this is a mistake.",
    tooManyRequests: "Too many attempts. Please wait a moment before trying again.",
    networkError: "Network error. Check your connection and try again.",
    popupClosed: "The sign-in window was closed. Please try again.",
    cancelledPopup: "Another sign-in window is already open.",
    popupBlocked: "Your browser blocked the sign-in popup. Allow popups for this site and try again.",
    requiresRecentLogin: "For security reasons, please sign in again before continuing.",
    weakPassword: "Password must be at least 6 characters.",
    operationNotAllowed: "This sign-in method is not enabled in Firebase. Enable Google Sign-In under Authentication > Sign-in method.",
    unauthorizedDomain: "This domain is not authorized for sign-in. Add it under Firebase Authentication > Settings > Authorized domains (e.g. growthkit.jcode.be).",
    internalError: "Sign-in failed due to a server error. Please try again later.",
    genericError: "Something went wrong. Please try again.",
  },
  fr: {
    emailAlreadyInUse: "Cet e-mail a déjà un compte. Connectez-vous plutôt.",
    userNotFound: "Aucun compte trouvé pour cet e-mail. Créez-en un ci-dessous.",
    wrongPassword: "Mot de passe incorrect. Veuillez réessayer.",
    invalidCredential: "E-mail ou mot de passe incorrect. Veuillez réessayer.",
    invalidEmail: "Cela ne ressemble pas à une adresse e-mail valide.",
    userDisabled: "Ce compte a été désactivé. Contactez le support si vous pensez que c'est une erreur.",
    tooManyRequests: "Trop de tentatives. Veuillez attendre un moment avant de réessayer.",
    networkError: "Erreur réseau. Vérifiez votre connexion et réessayez.",
    popupClosed: "La fenêtre de connexion a été fermée. Veuillez réessayer.",
    cancelledPopup: "Une autre fenêtre de connexion est déjà ouverte.",
    popupBlocked: "Votre navigateur a bloqué la fenêtre contextuelle de connexion. Autorisez les fenêtres contextuelles pour ce site et réessayez.",
    requiresRecentLogin: "Pour des raisons de sécurité, veuillez vous reconnecter avant de continuer.",
    weakPassword: "Le mot de passe doit contenir au moins 6 caractères.",
    operationNotAllowed: "Cette méthode de connexion n'est pas activée dans Firebase. Activez Google Sign-In sous Authentication > Sign-in method.",
    unauthorizedDomain: "Ce domaine n'est pas autorisé pour la connexion. Ajoutez-le sous Firebase Authentication > Settings > Authorized domains (p.ex. growthkit.jcode.be).",
    internalError: "La connexion a échoué en raison d'une erreur serveur. Veuillez réessayer plus tard.",
    genericError: "Une erreur s'est produite. Veuillez réessayer.",
  },
  de: {
    emailAlreadyInUse: "Diese E-Mail hat bereits ein Konto. Melden Sie sich stattdessen an.",
    userNotFound: "Kein Konto für diese E-Mail gefunden. Erstellen Sie unten eines.",
    wrongPassword: "Falsches Passwort. Bitte versuchen Sie es erneut.",
    invalidCredential: "Falsche E-Mail oder Passwort. Bitte versuchen Sie es erneut.",
    invalidEmail: "Das sieht nicht nach einer gültigen E-Mail-Adresse aus.",
    userDisabled: "Dieses Konto wurde deaktiviert. Wenden Sie sich an den Support, wenn Sie glauben, dass dies ein Fehler ist.",
    tooManyRequests: "Zu viele Versuche. Bitte warten Sie einen Moment, bevor Sie es erneut versuchen.",
    networkError: "Netzwerkfehler. Überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
    popupClosed: "Das Anmeldefenster wurde geschlossen. Bitte versuchen Sie es erneut.",
    cancelledPopup: "Ein anderes Anmeldefenster ist bereits geöffnet.",
    popupBlocked: "Ihr Browser hat das Anmelde-Popup blockiert. Erlauben Sie Popups für diese Seite und versuchen Sie es erneut.",
    requiresRecentLogin: "Aus Sicherheitsgründen melden Sie sich bitte erneut an, bevor Sie fortfahren.",
    weakPassword: "Passwort muss mindestens 6 Zeichen lang sein.",
    operationNotAllowed: "Diese Anmeldemethode ist in Firebase nicht aktiviert. Aktivieren Sie Google Sign-In unter Authentication > Sign-in method.",
    unauthorizedDomain: "Diese Domain ist für die Anmeldung nicht autorisiert. Fügen Sie sie unter Firebase Authentication > Settings > Authorized domains hinzu (z.B. growthkit.jcode.be).",
    internalError: "Anmeldung aufgrund eines Serverfehlers fehlgeschlagen. Bitte versuchen Sie es später erneut.",
    genericError: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
  },
};

export function getAuthErrorMessage(error: unknown, language: AuthLanguage): string {
  const code = (error as { code?: string }).code ?? "";
  const c = authCopyMap[language];
  const errorMap: Record<string, string> = {
    "auth/email-already-in-use": c.emailAlreadyInUse,
    "auth/user-not-found": c.userNotFound,
    "auth/wrong-password": c.wrongPassword,
    "auth/invalid-credential": c.invalidCredential,
    "auth/invalid-email": c.invalidEmail,
    "auth/user-disabled": c.userDisabled,
    "auth/too-many-requests": c.tooManyRequests,
    "auth/network-request-failed": c.networkError,
    "auth/popup-closed-by-user": c.popupClosed,
    "auth/cancelled-popup-request": c.cancelledPopup,
    "auth/popup-blocked": c.popupBlocked,
    "auth/requires-recent-login": c.requiresRecentLogin,
    "auth/weak-password": c.weakPassword,
    "auth/operation-not-allowed": c.operationNotAllowed,
    "auth/unauthorized-domain": c.unauthorizedDomain,
    "auth/internal-error": c.internalError,
  };

  if (import.meta.env.DEV && code && !errorMap[code]) {
    console.error("[auth]", code, error);
  }

  return errorMap[code] ?? c.genericError;
}
