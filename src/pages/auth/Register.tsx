import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import BlueButton from "../../components/buttons/BlueButton";
import InputField from "../../components/fields/InputField";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white border border-gray-200 px-6 py-5 rounded-xl shadow-lg w-[400px]">
        {/* Titulo con icono y mensaje informativo */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <span className="font-bold text-2xl">Crear Cuenta</span>
            <span className="text-gray-500 text-sm">
              Regístrate con tu cuenta para continuar
            </span>
          </div>
          {/* Formulario de login */}
          <InputField
            label="Nombre Completo"
            props={{
              type: "email",
              placeholder: "John Doe",
            }}
          />
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
          <InputField
            label="Confirmar Contraseña"
            props={{
              type: "password",
              placeholder: "••••••••••••",
            }}
          />

          <BlueButton
            type="button"
            onClick={() => {
              toast.success("Su cuenta ha sido creada con éxito", {
                duration: 3000,
              });

              setTimeout(() => {
                navigate(PATHS.LOGIN);
              }, 1000);
            }}
          >
            Crear Cuenta
          </BlueButton>
          {/* Enlace para recuperar contraseña y registro */}
          <div className="flex gap-1">
            <span className="text-sm text-gray-500">
              ¿Ya tienes una cuenta?
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

export default Register;
