# NestJS

First of all, I create a new NestJS project by its boilerplate.

```bash
$ nest new [PROJECT_NAME]
```

If the command `nest` does not work, you should install the package of NestJS CLI.

```bash
$ npm -g install @nestjs/cli
```

When you create the new project, you can select package manager such as `npm`, `yarn`, and `pnpm`.

Note that I just selected `yarn` package manager.

# Prisma init

Follow the official [link](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql) for Prisma with Postgres database.

Add the prisma package:

```bash
$ yarn add prisma --dev
```

Initialize the settings of prisma:

```bash
$ yarn prisma init
```

# Prisma with Postgres

만약 처음으로 데이터베이스를 구축하고 있다면 별도의 스키마가 없을 것입니다.

다음과 같이 _prisma/schema.prisma_ 파일을 작성하여 모델을 추가합니다.

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

이후에 아래 명령어를 통해 Migration을 수행할 수 있습니다.

```bash
$ yarn prisma migrate dev --name init
```

만약 Prisma Schema를 수정하였다면, 위의 새로운 Migrate 명령어를 사용하거나 아래 명령어를 반드시 실행해야 합니다.

```bash
$ yarn prisma db push
```

위 명령어들을 통해 현재 Schema와 DB Schema가 Sync될 수 있으며, 또한 다음에서 설치할 Prisma Client에 대한 코드를 업데이트할 수 있습니다.

이제 Prisma Client를 설치하여 코드에서 Prisma를 이용할 수 있습니다.

```bash
$ yarn add @prisma/client
```

이 Client를 통해 다양한 명령어를 조작할 수 있습니다.

특히, 상기의 업데이트가 일어났을 때, 아래 명령어를 통해 Prisma Client를 업데이트합니다.

```bash
$ yarn prisma generate
```
