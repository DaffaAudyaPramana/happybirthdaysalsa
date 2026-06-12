"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
} from "motion/react";
import {
  Gift,
  Heart,
  Music2,
  Pause,
  Sparkles,
} from "lucide-react";

const GIRLFRIEND_NAME = "Nadzira Salsa";

/**
 * Ubah sesuai tanggal ulang tahun.
 *
 * Format:
 * YYYY-MM-DDT00:00:00+07:00
 *
 * Contoh:
 * 20 Juni 2026
 * 2026-06-20T00:00:00+07:00
 */

const BIRTHDAY_TARGET = "2026-06-20T00:00:00+07:00";

const mainPhotos = [
  {
    src: "/photos/photo-1.jpg",
    title: "Senyum Favoritku",
    description:
      "Senyummu selalu punya cara untuk membuat hariku menjadi lebih baik.",
  },
  {
    src: "/photos/photo-2.jpg",
    title: "Momen Sederhana",
    description:
      "Bersamamu, hal-hal kecil pun bisa terasa jauh lebih berarti.",
  },
  {
    src: "/photos/photo-3.jpg",
    title: "Cantik dengan Caramu",
    description:
      "Aku suka caramu tersenyum, tertawa, dan menjadi dirimu sendiri.",
  },
  {
    src: "/photos/photo-4.jpg",
    title: "Kenangan Manis",
    description:
      "Ada banyak hal yang ingin aku ingat, dan kamu selalu ada di dalamnya.",
  },
  {
    src: "/photos/photo-5.jpg",
    title: "Kamu yang Aku Syukuri",
    description:
      "Dari banyak hal di hidupku, kamu adalah salah satu yang paling aku syukuri.",
  },
  {
    src: "/photos/photo-6.jpg",
    title: "Tetap Jadi Kamu",
    description:
      "Semoga kamu selalu bahagia dengan cara yang paling tulus.",
  },
];

const randomPhotos = [
  {
    src: "/photos/random-1.jpg",
    caption: "Senyum yang selalu aku tunggu.",
  },
  {
    src: "/photos/random-2.jpg",
    caption: "Kamu dan segala hal kecil yang aku suka.",
  },
  {
    src: "/photos/random-3.jpg",
    caption: "Salah satu foto favoritku.",
  },
  {
    src: "/photos/random-4.jpg",
    caption: "Cantik dengan caramu sendiri.",
  },
  {
    src: "/photos/random-5.jpg",
    caption: "Momen sederhana yang terasa istimewa.",
  },
  {
    src: "/photos/random-6.jpg",
    caption: "Senyuman yang selalu membuatku tenang.",
  },
  {
    src: "/photos/random-7.jpg",
    caption: "Kamu yang selalu aku syukuri.",
  },
  {
    src: "/photos/random-8.jpg",
    caption: "Sebuah momen yang ingin terus aku simpan.",
  },
  {
    src: "/photos/random-9.jpg",
    caption: "Tetap jadi kamu yang paling aku sayang.",
  },
];

const memories = [
  {
    number: "01",
    title: "Awal Cerita",
    description:
      "Ada momen di mana aku mulai sadar, kamu bukan orang biasa untuk aku.",
  },
  {
    number: "02",
    title: "Momen yang Aku Ingat",
    description:
      "Bukan karena harinya sempurna, tapi karena setiap hari di dalemnya ada kamu.",
  },
  {
    number: "03",
    title: "Hari Spesialmu",
    description:
      "Di hari ulang tahun kamu ini aku pengen kamu tau kalo kamu sangat sangat berarti untuk aku.",
  },
];

const loveLetter = `Selamat ulang tahun, sayang.

Di hari yang spesial ini, aku cuma ingin bilang terima kasih karena kamu udah hadir di hidup aku. Terima kasih yaa udah menjadi seseorang yang membuat hari-hari aku terasa lebih hangat, lebih tenang, dan lebih berarti.

Aku mungkin ga selalu pandai merangkai kata, aku cuek, aku dingin, tapi aku bener-bener sayang sama kamu, bersyukur bisa mengenal kamu, sayang kamu, dan melihat kamu tumbuh dan berkembang menjadi pribadi yang luar biasa.

Aku berdoa semoga di usia baru ini, kamu selalu diberikan kesehatan, kebahagiaan, ketenangan hati, rezeki yang baik, dan semua hal indah yang selama ini kamu impikan.

Semoga setiap langkah kamu dimudahkan, setiap lelah kamu digantikan dengan bahagia, dan setiap doa baikmu satu per satu dikabulkan. Aamiin

Aku berharap bisa terus ada di samping kamu. Bukan cuma di hari-hari yang menyenangkan aja, tapi juga waktu kamu membutuhkan seseorang untuk didengarkan, menguatkan, dan ditemenin.

Terima kasih sudah menjadi dirimu sendiri.
Terima kasih sudah menjadi bagian paling indah dalam hidupku.

Aku sayang kamu 🤍`;

const fallingHearts = [
  {
    left: "5%",
    size: 18,
    delay: 0,
    duration: 12,
  },
  {
    left: "12%",
    size: 24,
    delay: 2,
    duration: 14,
  },
  {
    left: "20%",
    size: 16,
    delay: 1,
    duration: 11,
  },
  {
    left: "31%",
    size: 22,
    delay: 3,
    duration: 15,
  },
  {
    left: "44%",
    size: 18,
    delay: 1.5,
    duration: 13,
  },
  {
    left: "52%",
    size: 26,
    delay: 4,
    duration: 16,
  },
  {
    left: "63%",
    size: 17,
    delay: 2.5,
    duration: 12,
  },
  {
    left: "71%",
    size: 22,
    delay: 0.5,
    duration: 14,
  },
  {
    left: "83%",
    size: 18,
    delay: 3.5,
    duration: 13,
  },
  {
    left: "92%",
    size: 25,
    delay: 1.2,
    duration: 15,
  },
];

type TimeLeft = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const emptyTimeLeft: TimeLeft = {
  total: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getTimeLeft(): TimeLeft {
  const targetDate = new Date(BIRTHDAY_TARGET).getTime();
  const currentDate = new Date().getTime();
  const total = targetDate - currentDate;

  if (total <= 0) {
    return emptyTimeLeft;
  }

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (total / (1000 * 60 * 60)) % 24,
    ),
    minutes: Math.floor(
      (total / (1000 * 60)) % 60,
    ),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function FallingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {fallingHearts.map((heart, index) => (
        <motion.span
          key={`${heart.left}-${index}`}
          className="absolute text-rose-300/50"
          style={{
            left: heart.left,
            fontSize: heart.size,
          }}
          initial={{
            y: "-10vh",
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: "110vh",
            opacity: [0, 0.75, 0.75, 0],
            rotate: [0, 18, -18, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(
    null,
  );

  const letterRef = useRef<HTMLDivElement | null>(
    null,
  );

  const isLetterVisible = useInView(letterRef, {
    once: true,
    amount: 0.25,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const [audioMessage, setAudioMessage] =
    useState("");

  const [countdownReady, setCountdownReady] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState<TimeLeft>(emptyTimeLeft);

  const [typedLetter, setTypedLetter] =
    useState("");

  const [typingFinished, setTypingFinished] =
    useState(false);

  const [showSecret, setShowSecret] =
    useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(getTimeLeft());
      setCountdownReady(true);
    };

    updateCountdown();

    const timer = window.setInterval(
      updateCountdown,
      1000,
    );

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!isLetterVisible) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTypedLetter("");
    setTypingFinished(false);

    let currentIndex = 0;

    const typingTimer = window.setInterval(() => {
      currentIndex += 1;

      setTypedLetter(
        loveLetter.slice(0, currentIndex),
      );

      if (currentIndex >= loveLetter.length) {
        window.clearInterval(typingTimer);
        setTypingFinished(true);
      }
    }, 24);

    return () => {
      window.clearInterval(typingTimer);
    };
  }, [isLetterVisible]);

  const handleToggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setAudioMessage("");
        return;
      }

      await audio.play();

      setIsPlaying(true);
      setAudioMessage("");
    } catch {
      setIsPlaying(false);

      setAudioMessage(
        "Musik belum bisa diputar. Pastikan file love-song.mp3 sudah berada di folder public/music.",
      );
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#ffe4ef_0%,#fff7ed_38%,#fff1f2_100%)] text-slate-800">
      <audio
        ref={audioRef}
        src="/music/love-song.mp3"
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <FallingHearts />

      {/* MUSIC BUTTON */}
      <button
        type="button"
        onClick={handleToggleMusic}
        className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold text-rose-600 shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-white sm:right-6 sm:top-6"
      >
        {isPlaying ? (
          <Pause size={18} />
        ) : (
          <Music2 size={18} />
        )}

        <span className="hidden sm:inline">
          {isPlaying
            ? "Pause Musik"
            : "Play Musik"}
        </span>
      </button>

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-10">
        {/* HERO */}
        <section className="flex min-h-screen flex-col items-center justify-center gap-10 py-20 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/60 px-5 py-2 text-sm font-medium text-rose-500 shadow-sm backdrop-blur"
          >
            <Sparkles size={16} />

            Sebuah halaman kecil yang aku buat khusus
            untuk kamu
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.15,
            }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-rose-300/30 blur-2xl" />

            <div className="relative -rotate-2 rounded-[2rem] border border-white bg-white p-4 shadow-2xl">
              <Image
                src="/photos/hero.jpg"
                alt={`Foto ${GIRLFRIEND_NAME}`}
                width={520}
                height={640}
                priority
                className="h-[420px] w-[310px] rounded-[1.5rem] object-cover sm:h-[520px] sm:w-[390px]"
              />

              <p className="mt-4 font-serif text-lg font-semibold italic text-rose-500">
                My favorite person 🤍
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="max-w-3xl"
          >
            <p className="mb-3 text-base font-medium text-rose-500">
              Untuk {GIRLFRIEND_NAME}
            </p>

            <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl">
              Selamat Ulang Tahun, Sayang.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Hari ini adalah hari yang spesial,
              karena seseorang yang paling aku syukuri
              hadir di dunia ini.
            </p>

            {audioMessage && (
              <p className="mt-5 rounded-2xl border border-rose-100 bg-white/70 px-4 py-3 text-sm text-rose-500 shadow-sm">
                {audioMessage}
              </p>
            )}
          </motion.div>

          {/* COUNTDOWN */}
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.45,
            }}
            className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/55 p-5 shadow-xl backdrop-blur-md"
          >
            {!countdownReady ? (
              <div className="py-7">
                <p className="text-sm font-medium text-rose-400">
                  Menyiapkan hitungan menuju hari
                  spesialmu...
                </p>
              </div>
            ) : timeLeft.total > 0 ? (
              <>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">
                  Menuju hari spesialmu
                </p>

                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {[
                    {
                      label: "Hari",
                      value: timeLeft.days,
                    },
                    {
                      label: "Jam",
                      value: timeLeft.hours,
                    },
                    {
                      label: "Menit",
                      value: timeLeft.minutes,
                    },
                    {
                      label: "Detik",
                      value: timeLeft.seconds,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl bg-white/80 p-3 shadow-sm sm:p-4"
                    >
                      <p className="text-xl font-black text-rose-500 sm:text-3xl">
                        {String(item.value).padStart(
                          2,
                          "0",
                        )}
                      </p>

                      <p className="mt-1 text-[10px] font-medium text-slate-500 sm:text-xs">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-3">
                <Gift
                  className="text-rose-500"
                  size={34}
                />

                <p className="text-xl font-bold text-slate-900">
                  Hari spesialmu sudah tiba 🤍
                </p>

                <p className="text-sm text-slate-500">
                  Semoga hari ini menjadi salah satu
                  hari paling bahagia untukmu.
                </p>
              </div>
            )}
          </motion.div>
        </section>

        {/* MAIN GALLERY */}
        <section className="py-24">
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">
              Galeri kecil
            </p>

            <h2 className="mt-3 text-4xl font-black text-slate-900 sm:text-5xl">
              Beberapa hal indah tentang kamu
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Foto-foto ini mungkin sederhana, tetapi
              setiap momennya punya tempat sendiri di
              hatiku.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mainPhotos.map((photo, index) => (
              <motion.article
                key={photo.src}
                initial={{
                  opacity: 0,
                  y: 28,
                  rotate:
                    index % 2 === 0 ? -3 : 3,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate:
                    index % 2 === 0 ? -2 : 2,
                }}
                whileHover={{
                  scale: 1.04,
                  rotate: 0,
                  y: -8,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="rounded-[1.75rem] border border-white bg-white p-4 shadow-xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width={500}
                  height={620}
                  className="h-80 w-full rounded-[1.25rem] object-cover"
                />

                <div className="px-2 pb-2 pt-4">
                  <h3 className="text-xl font-black text-slate-900">
                    {photo.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {photo.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* RANDOM 9 PHOTOS */}
        <section className="py-24">
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mb-14 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">
              Potongan kenangan
            </p>

            <h2 className="mt-3 text-4xl font-black text-slate-900 sm:text-5xl">
              Sembilan foto tentang kamu
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Sembilan foto random yang mungkin terlihat
              sederhana, tetapi setiap fotonya punya
              cerita dan alasan tersendiri untuk aku
              simpan.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {randomPhotos.map((photo, index) => {
              const restingRotation =
                index % 3 === 0
                  ? -2
                  : index % 3 === 1
                    ? 1
                    : -1;

              const imageAspectRatio =
                index === 1 ||
                index === 5 ||
                index === 7
                  ? "aspect-[4/5]"
                  : "aspect-square";

              return (
                <motion.article
                  key={photo.src}
                  initial={{
                    opacity: 0,
                    y: 35,
                    rotate:
                      index % 2 === 0 ? -4 : 4,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotate: restingRotation,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.06,
                  }}
                  whileHover={{
                    y: -10,
                    rotate: 0,
                    scale: 1.025,
                  }}
                  className="group rounded-[1.75rem] border border-white/80 bg-white p-3 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:p-4"
                >
                  <div
                    className={`relative overflow-hidden rounded-[1.25rem] bg-rose-100 ${imageAspectRatio}`}
                  >
                    <Image
                      src={photo.src}
                      alt={`Foto kenangan ${GIRLFRIEND_NAME} nomor ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                    <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-rose-500 opacity-0 shadow-lg backdrop-blur-md transition duration-300 group-hover:opacity-100">
                      <Heart
                        size={17}
                        fill="currentColor"
                      />
                    </div>
                  </div>

                  <div className="px-1 pb-2 pt-4 text-center sm:px-2">
                    <p className="text-sm font-bold leading-6 text-slate-700 sm:text-base">
                      {photo.caption}
                    </p>

                    <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-rose-200 transition-all duration-300 group-hover:w-16 group-hover:bg-rose-400" />
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-3 rounded-3xl border border-white/70 bg-white/60 px-6 py-4 text-center text-sm font-medium text-slate-600 shadow-lg backdrop-blur-md sm:rounded-full"
          >
            <Heart
              size={18}
              className="shrink-0 text-rose-500"
              fill="currentColor"
            />

            Setiap foto yang ada kamu, entah kenapa selalu berhasil untuk menjadi bagian
            favorit dari galeri aku.
          </motion.div>
        </section>

        {/* TIMELINE */}
        <section className="py-24">
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">
              Cerita kecil
            </p>

            <h2 className="mt-3 text-4xl font-black text-slate-900 sm:text-5xl">
              Tentang kita, tentang kamu
            </h2>
          </motion.div>

          <div className="mx-auto mt-14 max-w-3xl space-y-6">
            {memories.map((memory, index) => (
              <motion.article
                key={memory.number}
                initial={{
                  opacity: 0,
                  x:
                    index % 2 === 0
                      ? -30
                      : 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="relative rounded-[2rem] border border-white/70 bg-white/60 p-6 shadow-lg backdrop-blur-md sm:p-7"
              >
                <div className="absolute -left-3 top-8 flex h-8 w-8 items-center justify-center rounded-full bg-rose-400 text-white shadow-md">
                  <Heart
                    size={15}
                    fill="currentColor"
                  />
                </div>

                <p className="text-sm font-bold text-rose-500">
                  {memory.number}
                </p>

                <h3 className="mt-2 text-2xl font-black text-slate-900">
                  {memory.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {memory.description}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* LOVE LETTER */}
        <section
          ref={letterRef}
          className="py-24"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 28,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/70 bg-white/70 p-6 shadow-2xl backdrop-blur-md sm:p-10"
          >
            <div className="mb-8 flex items-start gap-3 sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <Heart fill="currentColor" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-400">
                  Surat kecil
                </p>

                <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                  Untuk kamu yang paling aku sayang
                </h2>
              </div>
            </div>

            <div className="min-h-[520px] whitespace-pre-line rounded-[2rem] bg-rose-50/70 p-5 text-base leading-8 text-slate-700 sm:p-7 sm:text-lg">
              {typedLetter}

              {!typingFinished && (
                <span className="animate-pulse text-rose-500">
                  |
                </span>
              )}
            </div>
          </motion.div>
        </section>

        {/* SECRET MESSAGE */}
        <section className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">
              Terakhir
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-900 sm:text-6xl">
              Ada satu hal lagi yang perlu kamu tahu
            </h2>

            {!showSecret && (
              <button
                type="button"
                onClick={() =>
                  setShowSecret(true)
                }
                className="mt-10 rounded-full bg-rose-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-rose-300/50 transition duration-300 hover:scale-105 hover:bg-rose-600"
              >
                Klik kalau kamu mau tahu sesuatu
              </button>
            )}

            <AnimatePresence>
              {showSecret && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="mt-10 rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-2xl backdrop-blur-md"
                >
                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: [0, 1.2, 1],
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500"
                  >
                    <Heart
                      size={32}
                      fill="currentColor"
                    />
                  </motion.div>

                  <p className="text-4xl font-black text-rose-500 sm:text-6xl">
                    I LOVE U 🤍
                  </p>

                  <p className="mt-5 text-slate-600">
                    Hari ini, besok, dan seterusnya.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setShowSecret(false)
                    }
                    className="mt-7 text-sm font-semibold text-rose-400 transition hover:text-rose-600"
                  >
                    Tutup pesan
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="pb-10 pt-5 text-center">
          <p className="text-sm text-slate-500">
            Dibuat dengan sepenuh hati untuk{" "}
            <span className="font-bold text-rose-500">
              {GIRLFRIEND_NAME}
            </span>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}