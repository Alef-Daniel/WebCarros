import { Link, replace, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import Container from '../../components/container'
import Input from '../../components/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
 

const schema = z.object({
  email: z.string().email("Insira um email válido").nonempty('o campo é obrigatório'),
  password: z.string().nonempty('o campo senha é obrigatório ')
})

type formData = z.infer<typeof schema>

export function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  useEffect(()=>{

    async function handleLogout(){
      await signOut(auth)
    }

    handleLogout();

  },[])

  function onSubmit(data: formData) {
   signInWithEmailAndPassword(auth, data.email, data.password)
   .then(()=>{
    toast.success('Login realizado')
    navigate('/dashboard', {replace:true})
   })
   .catch((error)=>{
      toast.error('Usuário ou senha incorretos!', error)
   })
  }


  return (
    <Container>
      <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
        <Link to={"/"} className='mb-6 max-w-sm  w-full'>
          <img src={logoImg} alt='Logo do siet' className='w-full' />
        </Link>
        <form className='bg-white max-w-xl w-full rounded-lg p-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3'>
            <Input
              type='e-mail'
              placeholder="Digite seu E-mail"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>
          <div className='mb-3'>
            <Input
              type='password'
              placeholder="Digite sua senha"
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>
          <button className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium' type='submit'>Acessar</button>
        </form>
        <Link className='hover:underline' to={'/register'}>Ainda não possui uma conta? Cadastre-se</Link>
      </div>
    </Container>
  )
}


