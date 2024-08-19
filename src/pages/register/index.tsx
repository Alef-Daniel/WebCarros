import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import Container from '../../components/container'
import Input from '../../components/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '../../services/firebaseConnection'
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../../context/authContext'

const schema = z.object({
  email: z.string().email("Insira um email válido").nonempty('o campo é obrigatório'),
  password: z.string().min(6,'a senha deve ter pelo menos 6 caracteres').nonempty('o campo senha é obrigatório '),
  name: z.string().nonempty('o campo nome é obrigatorio')
})



type formData = z.infer<typeof schema>

export function Register() {
  const {handelInfoUser} = useContext(AuthContext)
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

  async function onSubmit(data: formData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (user)=>{
      await updateProfile(user.user, {
        displayName: data.name
      })

      handelInfoUser({
        name: data.name,
        email:data.email,
        uid: user.user.uid
      })
      
      console.log('Cadastrado com sucesso')
      navigate('/dashboard', {replace: true})
    })
    .catch((error)=>{
      console.log('Erro ao cadastrar usuario',error)
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
              type='text'
              placeholder="Digite seu nome completo"
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>
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
          
          <button className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium' type='submit'>Cadastrar</button>
        </form>
        <Link className='hover:underline'to={'/login'}>Já possui uma conta? Faça o login</Link>
      </div>
    </Container>
  )
}


