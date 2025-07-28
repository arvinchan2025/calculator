import MainRouter from "@/router/main";
import { useEffect } from "react";
import {useLocation, useNavigate, useParams } from "react-router-dom";


const I18NRouter = () => {
  const {lang} = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    const preferred = ['en', 'es', 'ar'].includes(browserLang) ? browserLang : 'en';
    if (!lang && preferred !== 'en') {
      navigate(`/${preferred}${location.pathname}`);
    }
  }, [lang]);

  return (
    <MainRouter />
  )

}
export default I18NRouter