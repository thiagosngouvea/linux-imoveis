import React, { useState } from 'react';
import emailjs from 'emailjs-com';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contato() {
  const [formValues, setFormValues] = useState<ContactForm>({ name: '', email: '', phone: '', message: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // emailjs
    //   .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', event.currentTarget, 'YOUR_USER_ID')
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
    setFormValues({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/3 p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-600 font-serif">Entre em contato</h1>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Nome:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Seu nome"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Seu email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
              Telefone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              placeholder="Seu telefone"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="Mensagem"
              value={formValues.message}
              onChange={handleChange}
              placeholder="Sua mensagem"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="w-2/3 p-8">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-600 font-serif">Endereço:</h1>
        </div>
        <p className='text-md text-gray-600 font-serif mb-4'>Linux Imóveis</p>
        <p className='text-sm'>Av. Agamenon Magalhães, 444 - Ed Empresarial Difusora, Andar 11, Sala 630, Maurício de Nassau - Caruaru/PE, 55012-290</p>
        <a 
          href="https://www.google.com/maps/dir/?api=1&destination=Av.%20Agamenon%20Magalh%C3%A3es%2C%20444%2C%20Maur%C3%ADcio%20de%20Nassau%20-%20Caruaru%2FPE%2C%2055012-290" 
          target="_blank" 
          rel="noopener noreferrer"
          >
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Veja como chegar
            </button>
        </a>
      </div>
    </div>
  );
}