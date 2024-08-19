import { FiTrash, FiUpload } from "react-icons/fi";
import Container from "../../../components/container";
import DashboardHeader from "../../../components/panelHeader";
import { useForm } from "react-hook-form";
import Input from "../../../components/input";
import { z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import {v4 as uuidV4} from 'uuid'
import { storage, db } from "../../../services/firebaseConnection";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const schema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  model: z.string().nonempty("O modelo é obrigatório"),
  year:  z.string().nonempty("O Ano do carro é obrigatório"),
  km: z.string().nonempty("O KM do carro é obrigatório"),
  price: z.string().nonempty("O valor do carro é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z.string().min(1, "O telefone é obrigatório").refine((value) => /^(\d{11,12})$/.test(value), {
    message: "Número do telefone inválido."
  }),
  description:  z.string().nonempty("A descrição é obrigatória"),
})


type formData = z.infer<typeof schema>;

interface ImageItemProps{
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}
export function New() {
  const {user} = useContext(AuthContext)
  
  const {register, handleSubmit, formState: {errors}, reset} = useForm<formData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })
  const [carImages, setCarImages] = useState<ImageItemProps[]>([])
  const navigate = useNavigate();
  function onSubmit(data: formData){
  
    if(carImages.length === 0){
      toast.error("Envie alguma imagem do carro")
      return;
    }
    
    const carListImage = carImages.map(car=>{
      return {
        uid: car.uid,
        name: car.name, 
        url: car.url
      }
    })
      addDoc(collection(db, 'cars'), {
        name: data.name.toUpperCase(),
        model: data.model, 
        whatsapp: data.whatsapp,
        city: data.city,
        year: data.year,
        km: data.km,
        price: data.price,
        description: data.description,
        created: new Date(),
        owner: user?.name,
        uid: user?.uid,
        images: carListImage,
      })
      .then(()=>{
        reset();
        setCarImages([]);
        toast.success('Cadastrado com sucesso');
        navigate('/dashboard')
        
      })
      .catch(()=>{
        toast.error('Erro ao cadastrar informações')
      })
}

async function handleFile (e: ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      const image = e.target.files[0]
      if(image.type === 'image/jpeg' || image.type === 'image/png'){
       await handleUpload(image)
      }else{
        toast.error("tipo de arquivo inválido. Envie arquivos do tipo JPEG ou PNG!")
        return;
      }
    }
      
}

async function handleUpload(image: File){
    if(!user?.uid){
        return
    }

    const currentId= user?.uid
    const uidImage = uuidV4();
    const uploadRef=ref(storage, `images/${currentId}/${uidImage}`)
    uploadBytes(uploadRef, image)
    .then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((downloadUrl)=>{
        const imageItem = {
          name: uidImage,
          uid: currentId,
          previewUrl: URL.createObjectURL(image),
          url:downloadUrl 
        }

        setCarImages((images) =>[...images, imageItem])
      })
    }) 

}

async function handleDeleteImage(item: ImageItemProps){
    const imagePath = `images/${item.uid}/${item.name}`
    const imageRef = ref(storage, imagePath)
    try {
      await deleteObject(imageRef)
      setCarImages(carImages.filter((car)=>car.url !== item.url))
    } catch (error) {
      toast.error('Erro ao deletar imagem')
    }
}



  return (
    <Container>
      <DashboardHeader />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input className="opacity-0 cursor-pointer" type="file" accept="image/*" onChange={handleFile}></input>
          </div>
        </button>

        {carImages.map(item => (
          <div key={item.name} className="w-full h-32 flex items-center justify-center relative"> 
          <button className="absolute" onClick={()=> handleDeleteImage(item)}>
            <FiTrash size={28} color="white"/>
          </button>
            <img src={item.previewUrl} className="rounded-lg w-full h-32 object-cover" alt="Foto do carro"/>
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col  sm:flex-row items-center gap-2 mt-2 ">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
              <p className="mb-2 font-medium ">Nome do carro</p>
              <Input type="text" register={register} name="name" placeholder="Ex: Onix LT 1.0" error={errors.name?.message}/>
          </div>
          <div className="mb-3">
              <p className="mb-2 font-medium ">Modelo do carro</p>
              <Input type="text" register={register} name="model" placeholder="Ex: 1.0 flex plus manual" error={errors.model?.message}/>
          </div>
          <div className="w-full flex flex-row mb-3 items-center gap-4">

          <div className="w-full" >
              <p className="mb-2 font-medium ">Ano</p>
              <Input type="text" register={register} name="year" placeholder="Ex: 2016/2016" error={errors.year?.message}/>
          </div>
          <div className="w-full">
              <p className="mb-2 font-medium ">KM rodados</p>
              <Input type="text" register={register} name="km" placeholder="Ex: 23.220" error={errors.km?.message}/>
          </div>


          </div>
          <div className="w-full flex flex-row mb-3 items-center gap-4">

          <div className="w-full" >
              <p className="mb-2 font-medium ">Telefone / Whatsapp</p>
              <Input type="text" register={register} name="whatsapp" placeholder="Ex: 11976553452" error={errors.whatsapp?.message}/>
          </div>
          <div className="w-full">
              <p className="mb-2 font-medium ">Cidade</p>
              <Input type="text" register={register} name="city" placeholder="Ex: Campinas" error={errors.city?.message}/>
          </div>


          </div>
          <div className="mb-3">
              <p className="mb-2 font-medium ">Preço</p>
              <Input type="text" register={register} name="price" placeholder="Ex: 69.000" error={errors.price?.message}/>
          </div>
          <div className="mb-3">
              <p className="mb-2 font-medium ">Descrição</p>
              <textarea className="border-2 w-full rounded-md h-24 px-2" {...register("description")} name="description" id="description" placeholder="Digite a descrição completa sobre o carro"/>
              {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
          </div>
          <button type="submit" className="w-full rounded-md bg-zinc-900 text-white font-medium h-10">Cadastrar</button>
        </form>
      </div>
    </Container>
  )
}


