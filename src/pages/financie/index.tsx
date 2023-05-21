import React from "react";
import { CardFinanciamento } from "@/components/CardFinanciamento";
import LogoBB from "@/assets/bancobrasil.png";
import LogoBradesco from "@/assets/bradesco.png";
import LogoCaixa from "@/assets/caixa.png";
import LogoItau from "@/assets/itau.png";
import LogoSantander from "@/assets/santander.png";
import LogoBarinsul from "@/assets/branrisul.png";

const bancos = [
    {
        imageUrl: LogoBB,
        linkUrl: "https://www42.bb.com.br/portalbb/imobiliario/creditoimobiliario/simular,802,2250,2250.bbx"
    },
    {
        imageUrl: LogoBradesco,
        linkUrl: "https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm"
    },
    {
        imageUrl: LogoBarinsul,
        linkUrl: "http://www.banrisul.com.br/bob/link/bobw02hn_conteudo_lista2.aspx?secao_id=1069"
    },
    {
        imageUrl: LogoCaixa,
        linkUrl: "http://www8.caixa.gov.br/siopiinternet/simulaOperacaoInternet.do?method=inicializarCasoUso"
    },
    {
        imageUrl: LogoSantander,
        linkUrl: "https://www.negociosimobiliarios.santander.com.br/negociosimobiliarios/#/dados-pessoais"
    },
    {
        imageUrl: LogoItau,
        linkUrl: "https://credito-imobiliario.itau.com.br/proposta"
    },
]

export default function Financie(){
    return (
        <div className="w-full max-w-screen-md mx-auto mt-8">
            <h1 className="text-xl font-serif text-gray-600 font-bold">Financie seu imóvel</h1>
            <p className="text-gray-600 mb-4">Simule o financiamento do imóvel no seu banco de preferência</p>
            <div className="grid grid-cols-3 gap-2">
                {bancos.map((banco) => (
                    <CardFinanciamento
                        key={banco.linkUrl}
                        imageUrl={banco.imageUrl}
                        linkUrl={banco.linkUrl}
                    />
                ))}
            </div>
        </div>   
    )
}