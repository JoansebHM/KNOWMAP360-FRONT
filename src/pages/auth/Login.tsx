import { Link } from "react-router-dom";
import BlueButton from "../../components/buttons/BlueButton";
import CheckBoxField from "../../components/fields/CheckBoxField";
import InputField from "../../components/fields/InputField";
import { PATHS } from "../../routes/paths";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white border border-gray-200 px-6 py-5 rounded-xl shadow-lg w-[400px]">
        {/* Titulo con icono y mensaje informativo */}
        <div className="flex flex-col items-center gap-5">
          <span className="bg-blue-800 text-white p-2 text-2xl rounded-lg font-bold">
            K360
          </span>
          <div className="flex flex-col items-center gap-2">
            <span className="font-bold text-2xl">Bienvenido</span>
            <span className="text-gray-500 text-sm">
              Inicia sesión con tu cuenta para continuar
            </span>
          </div>
          {/* Formulario de login */}
          <InputField
            label="Email"
            props={{
              type: "email",
              placeholder: "tucorreo@ejemplo.com",
            }}
          />
          <InputField
            label="Contraseña"
            props={{
              type: "password",
              placeholder: "••••••••••••",
            }}
          />
          <CheckBoxField
            label="Recordarme"
            props={{
              defaultChecked: true,
            }}
          />
          <BlueButton type="button">Iniciar sesión</BlueButton>
          {/* Enlace para recuperar contraseña y registro */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              <span className="text-sm text-gray-500">
                ¿No tienes una cuenta?
              </span>
              <Link
                className="text-sm text-blue-600 hover:underline"
                to={PATHS.REGISTER}
              >
                Regístrate
              </Link>
            </div>
            <Link
              className="text-sm text-gray-500 hover:underline"
              to={PATHS.RECOVER_PASSWORD}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
