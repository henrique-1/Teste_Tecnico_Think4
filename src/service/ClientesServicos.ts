import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { ClientesRepositorios } from "../repositories/ClientesRepositorios";

interface IClientRequest {
  nome: string;
  celular: string;
  email: string;
  senha: string;
  cpf: string;
  cep: string;
  fk_cidades_id: number;
  bairro: string;
  rua: string;
  complemento?: string;
}

export class CadastrarClienteServico {
  async execute({
    nome,
    celular,
    email,
    senha,
    cpf,
    cep,
    fk_cidades_id,
    bairro,
    rua,
    complemento,
  }: IClientRequest) {
    const clientesRepositorios = getCustomRepository(ClientesRepositorios);

    if (
      !nome ||
      !celular ||
      !email ||
      !senha ||
      !cpf ||
      !cep ||
      !fk_cidades_id ||
      !rua ||
      !bairro
    ) {
      throw new Error("Dados inseridos incorretamente");
    }

    const clienteJaExiste = await clientesRepositorios.findOne({
      cpf,
    });

    if (clienteJaExiste) {
      throw new Error("Cliente já cadastrado");
    }

    const passwordHash = await hash(senha, 8);

    const cliente = clientesRepositorios.create({
      nome: nome,
      celular,
      email,
      senha: passwordHash,
      cpf,
      cep,
      fk_cidades_id: fk_cidades_id,
      bairro,
      rua,
      complemento,
      created_at: new Date(),
    });

    await clientesRepositorios.save(cliente);

    return cliente;
  }
}

export class ListarClienteServicos {
  async execute(cpf) {
    const clientesRepositorios = getCustomRepository(ClientesRepositorios);

    const cliente = await clientesRepositorios.findOne({
      cpf,
    });

    return cliente;
  }
}
