import { PrismaClient, SubjectName } from '@prisma/client';

const prisma = new PrismaClient();

interface OriginalFormat {
  name: string;
  definition: string[];
}

interface DataEntry extends OriginalFormat {
  subject: SubjectName;
  topic: string;
}

const definitions = [
  {
    "name": "Gamete",
    "definition": "A haploid cell.",
    "keyword": "haploid"
  },
  {
    "name": "Gonad",
    "definition": "An organ that produces sex cells in animals.",
    "keyword": "sex cells"
  },
  {
    "name": "Ejaculation",
    "definition": "The release of semen from the penis.",
    "keyword": "semen"
  },
  {
    "name": "Secondary sexual characteristics",
    "definition": "Features that distinguish males from females apart from the sex organs.",
    "keyword": "features"
  },
  {
    "name": "Infertility",
    "definition": "The inability to produce young.",
    "keyword": "inability"
  },
  {
    "name": "Ovulation",
    "definition": "The release of an egg from the ovary.",
    "keyword": "egg"
  },
  {
    "name": "The menstrual cycle",
    "definition": "Series of events that occurs every 28 days on average in the female if fertilization has not taken place.",
    "keyword": "events"
  },
  {
    "name": "Insemination",
    "definition": "The release of semen into the vagina, outside the cervix.",
    "keyword": "semen"
  },
  {
    "name": "Fertilization",
    "definition": "Occurs when the nucleus of the sperm fuses with the nucleus of the egg, forming a diploid zygote.",
    "keyword": "nucleus"
  },
  {
    "name": "Birth control",
    "definition": "Involves methods to limit the number of children born.",
    "keyword": "limit"
  },
  {
    "name": "Abortion",
    "definition": "Termination of pregnancy.",
    "keyword": "termination"
  },
  {
    "name": "Contraception",
    "definition": "The deliberate prevention of fertilization/pregnancy.",
    "keyword": "prevention"
  },
  {
    "name": "Implantation",
    "definition": "The embedding of the fertilized egg into the lining of the uterus.",
    "keyword": "embedding"
  },
  {
    "name": "In vitro fertilization (IVF)",
    "definition": "Involves removing eggs from an ovary and fertilizing them outside the body.",
    "keyword": "fertilizing"
  },
  {
    "name": "Morula",
    "definition": "A solid ball of cells formed from a zygote by mitosis.",
    "keyword": "ball"
  },
  {
    "name": "Blastocyst",
    "definition": "A hollow ball of cells formed from a morula.",
    "keyword": "hollow"
  },
  {
    "name": "Germ layers",
    "definition": "Basic layers of cells in the blastocyst from which all adult tissues and organs will form.",
    "keyword": "layers"
  },
  {
    "name": "Gestation",
    "definition": "The length of time spent in the uterus from fertilization to birth.",
    "keyword": "length"
  },
  {
    "name": "Lactation",
    "definition": "The secretion of milk from mammary glands (breasts) of the female.",
    "keyword": "milk"
  }
]







async function main() {

  for (const data of definitions) {
    console.log(`For the term: ${data.name}`);
    
    // const subjectString = await askQuestion('Please provide a subject (e.g., BIOLOGY, CHEMISTRY): ');
    // const subject = subjectString as SubjectName;
    const subject = 'BIOLOGY' as SubjectName;
    const topic = 'HUMAN REPRODUCTION';

    // const topic = await askQuestion('Please provide a topic: ');

    const definitionString = data.definition

    // delete all definitions with topic GENETICS
    // await prisma.definition.deleteMany({
    //   where: {
    //     topic: 'IMMUNE SYSTEM',
    //   },
    // });

        

    await prisma.definition.create({
      data: {
        term: data.name,
        keyword: data.keyword,
        definition: definitionString,
        subject,
        topic
      }
    });

    console.log(`Added ${data.name} to the database.\n`);
  }

  console.log('Data inserted successfully.');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
});
