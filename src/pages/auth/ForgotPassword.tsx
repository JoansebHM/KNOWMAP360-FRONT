import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import BlueButton from '../../components/buttons/BlueButton';
import InputField from '../../components/fields/InputField';
import { PATHS } from '../../routes/paths';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

function ForgotPassword() {
  //   const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white border border-gray-200 px-6 py-5 rounded-xl shadow-lg w-[400px]">
        {/* Titulo con icono y mensaje informativo */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-2 w-full">
            <Link to={PATHS.LOGIN} className="self-start">
              <ChevronLeft />
            </Link>
            <span className="font-bold text-2xl">Recuperar Constraseña</span>
            <span className="text-gray-500 text-sm">
              Ingresa tu email para recuperar tu contraseña
            </span>
          </div>
          {/* Formulario de login */}
          <InputField
            label="Email"
            props={{
              type: 'email',
              placeholder: 'tucorreo@ejemplo.com',
            }}
          />

          <span className="text-gray-500 text-sm">
            Ingresa tu email y te enviaremos un enlace para restablecer tu
            contraseña
          </span>

          <BlueButton
            type="button"
            disabled={isSending}
            onClick={() => {
              toast.promise(
                new Promise<void>((resolve) => {
                  setIsSending(true);
                  setTimeout(() => {
                    resolve();
                    setIsSending(false);
                  }, 2000);
                }),
                {
                  loading: 'Enviando enlace...',
                  success: '¡Enlace enviado! Revisa tu correo.',
                  error: 'Error al enviar el enlace. Inténtalo de nuevo.',
                }
              );
            }}
          >
            {isSending ? 'Enviando...' : 'Enviar Enlace'}
          </BlueButton>
          {/* Enlace para recuperar contraseña y registro */}
          <div className="flex gap-1">
            <span className="text-sm text-gray-500">
              ¿Recordaste tu contraseña?
            </span>
            <Link
              className="text-sm text-blue-600 hover:underline"
              to={PATHS.LOGIN}
            >
              Inicia Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
