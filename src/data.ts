export type Level = "iniciante" | "intermediario" | "avancado";
export type WeekSize = 3 | 5;
export type Motion = "push" | "pull" | "squat" | "hinge" | "curl" | "core" | "cardio";

export type Exercise = {
  id: string;
  name: string;
  group: string;
  equipment: string;
  motion: Motion;
  instructions: string[];
  caution: string;
  level: Level[];
};

export type WorkoutDay = {
  id: string;
  title: string;
  focus: string;
  intensity: string;
  exerciseIds: string[];
};

export const levels: { id: Level; label: string; note: string }[] = [
  { id: "iniciante", label: "Iniciante", note: "Volume menor e execução bem controlada." },
  { id: "intermediario", label: "Intermediário", note: "Equilíbrio entre carga, volume e cardio." },
  { id: "avancado", label: "Avançado", note: "Mais séries e exercícios compostos." },
];

export const exercises: Exercise[] = [
  { id: "supino-reto", name: "Supino reto", group: "Peito", equipment: "Barra ou máquina", motion: "push", instructions: ["Pés firmes no chão.", "Desça a barra até perto do peito.", "Empurre sem perder o controle dos ombros."], caution: "Evite arquear demais a lombar.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "supino-inclinado", name: "Supino inclinado", group: "Peito", equipment: "Halteres", motion: "push", instructions: ["Banco inclinado em 30 a 45 graus.", "Cotovelos levemente abaixo dos ombros.", "Suba juntando os halteres sem bater."], caution: "Não deixe o ombro subir em direção à orelha.", level: ["intermediario", "avancado"] },
  { id: "crucifixo-maquina", name: "Crucifixo na máquina", group: "Peito", equipment: "Máquina", motion: "push", instructions: ["Ajuste o banco na linha do peito.", "Feche os braços com cotovelos suaves.", "Volte devagar até sentir alongar."], caution: "Não force amplitude se sentir o ombro.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "puxada-frente", name: "Puxada frontal", group: "Costas", equipment: "Pulley", motion: "pull", instructions: ["Segure a barra um pouco além dos ombros.", "Puxe em direção ao alto do peito.", "Controle a subida até alongar as costas."], caution: "Não jogue o tronco para trás para roubar carga.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "remada-baixa", name: "Remada baixa", group: "Costas", equipment: "Cabo", motion: "pull", instructions: ["Sente alto com peito aberto.", "Puxe a manopla até a linha do abdômen.", "Aproxime as escápulas no final."], caution: "Evite arredondar a lombar.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "remada-curvada", name: "Remada curvada", group: "Costas", equipment: "Barra", motion: "pull", instructions: ["Incline o tronco mantendo coluna neutra.", "Puxe a barra até perto do umbigo.", "Desça com controle."], caution: "Reduza a carga se perder postura.", level: ["intermediario", "avancado"] },
  { id: "agachamento-livre", name: "Agachamento livre", group: "Pernas", equipment: "Barra", motion: "squat", instructions: ["Pés na largura dos ombros.", "Desça com joelhos acompanhando os pés.", "Suba empurrando o chão."], caution: "Mantenha a coluna firme durante toda a repetição.", level: ["intermediario", "avancado"] },
  { id: "leg-press", name: "Leg press", group: "Pernas", equipment: "Máquina", motion: "squat", instructions: ["Apoie os pés na plataforma.", "Desça até manter quadril apoiado.", "Empurre sem travar os joelhos."], caution: "Não deixe o quadril sair do banco.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "cadeira-extensora", name: "Cadeira extensora", group: "Quadríceps", equipment: "Máquina", motion: "squat", instructions: ["Ajuste o apoio no tornozelo.", "Estenda os joelhos com controle.", "Segure um instante no topo."], caution: "Evite balanço e carga excessiva.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "mesa-flexora", name: "Mesa flexora", group: "Posterior", equipment: "Máquina", motion: "curl", instructions: ["Alinhe o joelho ao eixo da máquina.", "Flexione os joelhos sem levantar o quadril.", "Volte devagar."], caution: "Não use impulso na fase final.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "stiff", name: "Stiff", group: "Posterior", equipment: "Barra ou halteres", motion: "hinge", instructions: ["Joelhos levemente flexionados.", "Leve o quadril para trás.", "Suba contraindo glúteos e posteriores."], caution: "Pare antes de arredondar a lombar.", level: ["intermediario", "avancado"] },
  { id: "levantamento-terra", name: "Levantamento terra", group: "Corpo todo", equipment: "Barra", motion: "hinge", instructions: ["Barra próxima da canela.", "Peito aberto e coluna neutra.", "Suba estendendo quadril e joelhos juntos."], caution: "Use carga moderada até dominar a técnica.", level: ["avancado"] },
  { id: "desenvolvimento", name: "Desenvolvimento", group: "Ombros", equipment: "Halteres", motion: "push", instructions: ["Halteres na altura dos ombros.", "Empurre acima da cabeça.", "Desça até manter controle."], caution: "Não incline demais a lombar.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "elevacao-lateral", name: "Elevação lateral", group: "Ombros", equipment: "Halteres", motion: "push", instructions: ["Braços ao lado do corpo.", "Eleve até a linha dos ombros.", "Desça sem relaxar totalmente."], caution: "Evite encolher os ombros.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "face-pull", name: "Face pull", group: "Ombros e costas", equipment: "Cabo", motion: "pull", instructions: ["Cabo na altura do rosto.", "Puxe a corda em direção à testa.", "Abra cotovelos e controle a volta."], caution: "Mantenha pescoço relaxado.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "rosca-direta", name: "Rosca direta", group: "Bíceps", equipment: "Barra", motion: "curl", instructions: ["Cotovelos próximos ao tronco.", "Suba a barra sem balançar.", "Desça até quase estender os braços."], caution: "Evite jogar o corpo para trás.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "rosca-martelo", name: "Rosca martelo", group: "Bíceps", equipment: "Halteres", motion: "curl", instructions: ["Pegada neutra.", "Suba mantendo punhos firmes.", "Controle a descida."], caution: "Não abra os cotovelos para ganhar impulso.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "triceps-corda", name: "Tríceps corda", group: "Tríceps", equipment: "Cabo", motion: "push", instructions: ["Cotovelos fixos ao lado do corpo.", "Estenda os braços abrindo a corda.", "Volte até 90 graus."], caution: "Não mova o ombro junto com a puxada.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "triceps-testa", name: "Tríceps testa", group: "Tríceps", equipment: "Barra W", motion: "push", instructions: ["Deite com braços apontando para cima.", "Flexione cotovelos levando a barra à testa.", "Estenda sem bater os cotovelos."], caution: "Use carga leve para proteger cotovelos.", level: ["intermediario", "avancado"] },
  { id: "panturrilha", name: "Panturrilha em pé", group: "Panturrilhas", equipment: "Máquina", motion: "squat", instructions: ["Apoie a ponta dos pés.", "Suba o calcanhar ao máximo.", "Desça até alongar sem quicar."], caution: "Evite movimentos curtos demais.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "afundo", name: "Afundo", group: "Pernas e glúteos", equipment: "Halteres", motion: "squat", instructions: ["Dê um passo à frente.", "Desça até formar ângulos estáveis.", "Suba empurrando a perna da frente."], caution: "Mantenha o joelho alinhado ao pé.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "hip-thrust", name: "Hip thrust", group: "Glúteos", equipment: "Barra", motion: "hinge", instructions: ["Escápulas apoiadas no banco.", "Suba o quadril até alinhar o tronco.", "Contraia glúteos no topo."], caution: "Não hiperestenda a lombar.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "abdominal-maquina", name: "Abdominal na máquina", group: "Core", equipment: "Máquina", motion: "core", instructions: ["Ajuste o apoio ao tronco.", "Flexione o abdômen sem puxar com braços.", "Volte controlando."], caution: "Evite arredondar o pescoço com força.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "prancha", name: "Prancha", group: "Core", equipment: "Peso corporal", motion: "core", instructions: ["Cotovelos abaixo dos ombros.", "Corpo alinhado da cabeça aos pés.", "Respire mantendo abdômen firme."], caution: "Não deixe o quadril cair.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "abdominal-bicicleta", name: "Abdominal bicicleta", group: "Core", equipment: "Peso corporal", motion: "core", instructions: ["Deite com mãos leves atrás da cabeça.", "Alterne joelho e cotovelo opostos.", "Mantenha ritmo constante."], caution: "Não puxe o pescoço.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "esteira", name: "Esteira intervalada", group: "Cardio", equipment: "Esteira", motion: "cardio", instructions: ["Aqueça em ritmo confortável.", "Alterne tiros curtos e caminhada.", "Finalize desacelerando por alguns minutos."], caution: "Segure o ritmo sem perder passada.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "bike", name: "Bike ergométrica", group: "Cardio", equipment: "Bike", motion: "cardio", instructions: ["Ajuste o banco na altura do quadril.", "Pedale com tronco estável.", "Alterne resistência moderada e alta."], caution: "Não trave joelhos no final da pedalada.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "eliptico", name: "Elíptico", group: "Cardio", equipment: "Elíptico", motion: "cardio", instructions: ["Mantenha postura alta.", "Empurre e puxe as alças com ritmo.", "Use resistência que desafie sem desorganizar."], caution: "Evite apoiar todo o peso nas mãos.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "burpee-adaptado", name: "Burpee adaptado", group: "Metabólico", equipment: "Peso corporal", motion: "cardio", instructions: ["Agache e apoie as mãos.", "Leve os pés para trás um por vez ou juntos.", "Volte e finalize em pé."], caution: "Adapte a velocidade para manter técnica.", level: ["intermediario", "avancado"] },
  { id: "kettlebell-swing", name: "Swing com kettlebell", group: "Metabólico", equipment: "Kettlebell", motion: "hinge", instructions: ["Movimento nasce do quadril.", "Projete o kettlebell até a altura do peito.", "Deixe voltar mantendo coluna neutra."], caution: "Não transforme o movimento em agachamento.", level: ["intermediario", "avancado"] },
  { id: "crossover", name: "Crossover", group: "Peito", equipment: "Cabo", motion: "push", instructions: ["Dê um passo à frente.", "Feche os cabos à frente do peito.", "Volte até alongar sem perder postura."], caution: "Cotovelos ficam levemente flexionados.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "barra-fixa-assistida", name: "Barra fixa assistida", group: "Costas", equipment: "Máquina assistida", motion: "pull", instructions: ["Segure firme acima dos ombros.", "Puxe o peito em direção à barra.", "Desça até alongar com controle."], caution: "Evite balançar o corpo.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "passada-esteira", name: "Caminhada inclinada", group: "Cardio", equipment: "Esteira", motion: "cardio", instructions: ["Inclinação moderada.", "Passadas longas e controladas.", "Mantenha respiração estável."], caution: "Não se pendure no painel.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "remador", name: "Remador ergométrico", group: "Cardio e costas", equipment: "Remador", motion: "pull", instructions: ["Empurre com pernas primeiro.", "Puxe a alça ao final do movimento.", "Volte braços, tronco e pernas nessa ordem."], caution: "Não arredonde a coluna na frente.", level: ["intermediario", "avancado"] },
  { id: "abducao-maquina", name: "Abdução de quadril", group: "Glúteos", equipment: "Máquina", motion: "squat", instructions: ["Sente com coluna apoiada.", "Abra os joelhos contra a resistência.", "Volte sem deixar a carga bater."], caution: "Controle amplitude e postura.", level: ["iniciante", "intermediario", "avancado"] },
  { id: "aducao-maquina", name: "Adução de quadril", group: "Adutores", equipment: "Máquina", motion: "squat", instructions: ["Ajuste a abertura confortável.", "Feche as pernas com controle.", "Volte lentamente."], caution: "Evite amplitude agressiva no início.", level: ["iniciante", "intermediario", "avancado"] },
];

export const routines: Record<WeekSize, WorkoutDay[]> = {
  3: [
    { id: "forca-base", title: "Força base", focus: "Compostos, postura e carga progressiva", intensity: "Moderada", exerciseIds: ["leg-press", "supino-reto", "puxada-frente", "remada-baixa", "desenvolvimento", "prancha", "bike"] },
    { id: "hipertrofia-geral", title: "Hipertrofia geral", focus: "Volume equilibrado para o corpo todo", intensity: "Alta", exerciseIds: ["agachamento-livre", "supino-inclinado", "remada-curvada", "cadeira-extensora", "mesa-flexora", "elevacao-lateral", "triceps-corda", "rosca-direta"] },
    { id: "metabolico", title: "Condicionamento metabólico", focus: "Gasto calórico, core e resistência", intensity: "Dinâmica", exerciseIds: ["esteira", "afundo", "hip-thrust", "crossover", "barra-fixa-assistida", "abdominal-bicicleta", "eliptico"] },
  ],
  5: [
    { id: "forca-superior", title: "Força superior", focus: "Peito, costas e ombros com carga", intensity: "Alta", exerciseIds: ["supino-reto", "puxada-frente", "remada-baixa", "desenvolvimento", "face-pull", "prancha"] },
    { id: "forca-inferior", title: "Força inferior", focus: "Pernas, glúteos e posterior", intensity: "Alta", exerciseIds: ["agachamento-livre", "leg-press", "stiff", "hip-thrust", "panturrilha", "bike"] },
    { id: "hipertrofia-superior", title: "Hipertrofia superior", focus: "Volume para tronco e braços", intensity: "Moderada", exerciseIds: ["supino-inclinado", "crucifixo-maquina", "remada-curvada", "crossover", "rosca-martelo", "triceps-testa", "elevacao-lateral"] },
    { id: "hipertrofia-inferior", title: "Hipertrofia inferior", focus: "Quadríceps, posterior e glúteos", intensity: "Moderada", exerciseIds: ["cadeira-extensora", "mesa-flexora", "afundo", "abducao-maquina", "aducao-maquina", "panturrilha", "abdominal-maquina"] },
    { id: "condicionamento-core", title: "Condicionamento + core", focus: "Cardio intervalado, abdômen e resistência", intensity: "Dinâmica", exerciseIds: ["esteira", "remador", "kettlebell-swing", "burpee-adaptado", "abdominal-bicicleta", "prancha", "passada-esteira"] },
  ],
};

export function prescription(level: Level, motion: Motion) {
  const cardio = motion === "cardio";
  if (cardio) {
    return level === "iniciante"
      ? { sets: 1, reps: "12-18 min", rest: "Leve" }
      : level === "intermediario"
        ? { sets: 1, reps: "18-24 min", rest: "Moderado" }
        : { sets: 1, reps: "24-30 min", rest: "Intervalado" };
  }

  if (level === "iniciante") return { sets: 3, reps: "10-12", rest: "60-75s" };
  if (level === "intermediario") return { sets: 4, reps: "8-12", rest: "75-90s" };
  return { sets: 4, reps: "6-10", rest: "90-120s" };
}
