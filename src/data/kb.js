/**
 * @typedef {{ id: string, title: string, text: string }} Doc
 */

/**
 * Knowledge base — original paraphrases of Bhagavad Gita teachings.
 * Covers all 18 chapters, key verses, and every major life topic.
 * Not verbatim translations of any copyrighted text.
 *
 * Each doc is placed in one of Krishna's five teaching stages:
 *   1 = Identity  (Who am I? — soul, Atman)
 *   2 = Duty      (What should I do? — dharma, svadharma)
 *   3 = Action    (How should I act? — karma yoga, nishkama karma)
 *   4 = Devotion  (Why do I act? — bhakti, offering)
 *   5 = Liberation(What is the ultimate goal? — moksha, inner freedom)
 *
 * @type {Doc[]}
 */
export const RAW_DOCS = [

  // ── CHAPTER SUMMARIES (all 18) ────────────────────────────────────────────

  {
    id: "C1",
    title: "Chapter 1 — Arjuna's grief and crisis (Arjuna Vishada Yoga)",
    text: "Chapter 1 sets the scene on the battlefield of Kurukshetra. Arjuna asks his charioteer Krishna to drive between the two armies. Seeing his own relatives, teachers, and friends arrayed against him, Arjuna is overwhelmed with grief and compassion. His bow slips from his hands; he cannot bring himself to fight. This chapter establishes the central human problem the Gita addresses: paralysis in the face of duty when personal emotion and attachment conflict with what must be done. Arjuna's crisis is not weakness — it is the honest starting point of every genuine spiritual inquiry.",
  },
  {
    id: "C2",
    title: "Chapter 2 — The eternal self and path of wisdom (Sankhya Yoga)",
    text: "Chapter 2 is the Gita's philosophical foundation. Krishna teaches that the soul (Atman) is eternal, unborn, indestructible, and unchanged by death — only the body perishes. Grieving over death is therefore a confusion of the self with the body. Krishna introduces the concept of Nishkama Karma: performing one's duty without attachment to results. He describes the Sthitaprajna — a person of steady wisdom who is unmoved by sorrow or elated by pleasure, whose mind is like a flame in a windless place.",
  },
  {
    id: "C3",
    title: "Chapter 3 — The path of selfless action (Karma Yoga)",
    text: "Chapter 3 establishes that action is unavoidable — nature compels every being to act without ceasing. The Gita's answer is not to renounce action but to transform how action is performed: discover your svadharma (your own authentic duty), perform it wholeheartedly, and offer the results without selfish attachment. This combination — full effort, right duty, released outcome — is Karma Yoga. Performing someone else's duty well is inferior to performing your own duty imperfectly, because only your own dharma can be performed with genuine integrity. Krishna identifies desire and anger, born of the passionate guna (rajas), as the chief enemies that cloud this clarity.",
  },
  {
    id: "C4",
    title: "Chapter 4 — Knowledge, wisdom, and the fire of understanding (Jnana Yoga)",
    text: "Chapter 4 explains that Krishna has taught this wisdom in previous ages and it is renewed whenever righteousness declines — this is the doctrine of divine descent (avatara). Selfless action performed as an offering burns away all karmic bondage, just as fire burns fuel to ash. Krishna introduces different kinds of spiritual practice and sacrifice, all culminating in the fire of knowledge. He says: even the most sinful person can cross all evil by the boat of knowledge. The chapter ends urging Arjuna to cut the doubt born of ignorance with the sword of knowledge and arise.",
  },
  {
    id: "C5",
    title: "Chapter 5 — Renunciation and selfless action together (Karma Sannyasa Yoga)",
    text: "Chapter 5 reconciles action and renunciation: both lead to liberation, but selfless action is superior for most people. The person who has truly renounced neither hates nor desires; knowing the self acts through the body but is untouched by results, like a lotus leaf untouched by water. The wise see with equal vision a learned scholar, a cow, an elephant, a dog, and an outcaste. True happiness is found not in external objects but in the joy of the inner self. The yogi finds peace by abandoning external enjoyments and finding bliss within.",
  },
  {
    id: "C6",
    title: "Chapter 6 — Meditation and the controlled mind (Dhyana Yoga)",
    text: "Chapter 6 is the Gita's dedicated chapter on meditation. Krishna describes the technique: sit in a clean, stable seat; hold the spine, neck, and head erect; fix the gaze at the tip of the nose; be celibate and fearless. The restless mind is the greatest obstacle — Arjuna calls it harder to control than the wind. Krishna agrees but says it is mastered gradually through practice (abhyasa) and non-attachment (vairagya). He describes the highest state: the yogi who sees the self in all beings and all beings in the self. Even a failed spiritual practitioner is born into favorable circumstances in the next life and continues the journey.",
  },
  {
    id: "C7",
    title: "Chapter 7 — Knowledge of the divine (Jnana Vijnana Yoga)",
    text: "Chapter 7 describes Krishna as both the material and spiritual foundation of the universe — his lower nature is the eight elements (earth, water, fire, air, space, mind, intellect, ego); his higher nature is the life principle in all beings. Among thousands who seek him, only rare individuals truly know him. Four types of people approach the divine: those in distress, those seeking knowledge, those seeking wealth, and those with wisdom. Of these, the wise person who loves Krishna with single-pointed devotion is most dear. Maya (divine illusion of separateness) veils this understanding from most people.",
  },
  {
    id: "C8",
    title: "Chapter 8 — The imperishable Brahman and the path at death (Aksara Brahma Yoga)",
    text: "Chapter 8 addresses what happens at death and after. Whatever state of mind a person holds at the moment of death determines what they become — so it matters deeply how one spends one's life and thoughts. Krishna describes two paths after death: the bright path leading to liberation and non-return, and the dark path leading to rebirth. He teaches the syllable Om as the eternal Brahman and instructs Arjuna to remember him always and fight, for a mind fixed on the divine at all times will reach the divine at death.",
  },
  {
    id: "C9",
    title: "Chapter 9 — The royal knowledge and sovereign secret (Raja Vidya Yoga)",
    text: "Chapter 9 contains Krishna's most direct declaration of the path of devotion as the royal secret. He describes himself as the father, mother, sustainer, and witness of the universe; as the way, the supporter, and the refuge. Even people born in difficult circumstances can reach the highest destination through devotion. Krishna promises: whoever offers him a leaf, a flower, a fruit, or water with devotion — he accepts it. Whatever one does, eats, gives, or practices should be offered to him as a dedication. This makes every action sacred.",
  },
  {
    id: "C10",
    title: "Chapter 10 — The divine glories (Vibhuti Yoga)",
    text: "Chapter 10 is Krishna's catalogue of his divine manifestations in the world. He is the beginning, middle, and end of all beings; Vishnu among the Adityas, the sun among lights, the mind among senses, consciousness in all living things. Among rivers he is the Ganges; among mountains the Himalayas; among seasons the flower-bearing spring; among the weapons he is the thunderbolt. The key teaching is that wherever there is extraordinary excellence, beauty, power, or splendour in the world, that is a spark of the divine. Recognising this, the devotee sees the sacred everywhere.",
  },
  {
    id: "C11",
    title: "Chapter 11 — The cosmic vision (Vishvarupa Darshana Yoga)",
    text: "Chapter 11 is the most dramatic in the Gita. Arjuna asks to see Krishna's universal form, and Krishna grants him divine vision. Arjuna sees the entire cosmos — all beings, all gods, all times simultaneously — contained within Krishna's infinite form, with countless mouths, eyes, arms, and adornments, blazing like a thousand suns. Terrified, Arjuna sees armies rushing into Krishna's mouths like rivers into the ocean. Krishna declares: 'I am Time, the great destroyer of worlds.' Overwhelmed, Arjuna asks Krishna to return to his gentle human form, and Krishna does so, teaching that this vision is not available through scripture or austerity alone — only through single-pointed devotion.",
  },
  {
    id: "C12",
    title: "Chapter 12 — The path of devotion (Bhakti Yoga)",
    text: "Chapter 12 describes the qualities of the ideal devotee: free from hatred, friendly and compassionate to all, without possessiveness or ego, equal in pain and pleasure, forgiving, content, self-controlled, firm in conviction. Such a person is dear to Krishna above all others. The chapter establishes that love-devotion (bhakti) is accessible to everyone regardless of learning, caste, or circumstance. Devotion is not sentiment alone — it is expressed through all one's actions, all one's care, dedicated to the divine. Krishna says: fix your mind on me, love me, worship me, bow to me; doing so you will come to me.",
  },
  {
    id: "C13",
    title: "Chapter 13 — The field and the knower of the field (Kshetra Kshetrajna Vibhaga Yoga)",
    text: "Chapter 13 introduces the framework of Kshetra (the field — the body, mind, and world) and Kshetrajna (the knower of the field — the soul, pure consciousness). The field includes the five elements, ego, intellect, the unmanifest, the ten senses, the five objects of senses, desire, aversion, pleasure, pain, the aggregate body, intelligence, and steadfastness. The knower is beginningless, beyond cause and effect, neither existing nor not existing. The goal of wisdom is to see the imperishable in the perishable, the unchanging knower within the changing field.",
  },
  {
    id: "C14",
    title: "Chapter 14 — The three qualities of nature (Guna Traya Vibhaga Yoga)",
    text: "Chapter 14 explains that all of nature — and all human behaviour — is governed by three qualities (gunas): sattva (clarity, goodness, light), rajas (passion, activity, restlessness), and tamas (inertia, darkness, delusion). Sattva binds through attachment to knowledge and happiness; rajas binds through craving and activity; tamas binds through negligence, laziness, and sleep. The person who has transcended all three gunas — treating pleasure and pain, honour and dishonour, friend and foe equally — is said to have gone beyond the gunas and attained liberation.",
  },
  {
    id: "C15",
    title: "Chapter 15 — The supreme self (Purushottama Yoga)",
    text: "Chapter 15 uses the metaphor of an upside-down ashvattha tree (the cosmic tree of existence) whose roots are above (in Brahman) and branches below (in the manifest world). This tree must be cut at the root with the sword of non-attachment, and then one finds the source to which all beings return. Krishna identifies three principles: the perishable (all created beings), the imperishable (the unchanging soul), and the Supreme Self (Purushottama) who transcends both — the eternal God who pervades and sustains the universe. Knowing this highest truth frees a person completely.",
  },
  {
    id: "C16",
    title: "Chapter 16 — Divine and demonic natures (Daivasura Sampad Vibhaga Yoga)",
    text: "Chapter 16 contrasts divine qualities — fearlessness, purity, generosity, self-study, non-violence, truthfulness, freedom from anger, compassion for all beings, gentleness, modesty — with demonic qualities: hypocrisy, arrogance, excessive pride, anger, harshness, and ignorance. Demonic people do not know what is right or wrong, are consumed by desire, and resort to harmful means to satisfy craving. The chapter warns that the three gates to self-destruction are desire, anger, and greed. Abandoning these three, one acts for one's own good and reaches the highest goal.",
  },
  {
    id: "C17",
    title: "Chapter 17 — The three kinds of faith (Shraddha Traya Vibhaga Yoga)",
    text: "Chapter 17 categorises faith, food, sacrifice, austerity, and charity according to the three gunas. Sattvic faith leads to worship of gods and the higher self; rajasic faith leads to worship of power and wealth; tamasic faith leads to worship of ghosts and lower forces. Sattvic food promotes life, vitality, strength, health, and happiness; rajasic food is bitter, sour, salty, or causes pain; tamasic food is stale, tasteless, rotten, or impure. The chapter teaches that all genuine action, offering, austerity, and charity should be done with the spirit 'Tat Sat' — 'That is Truth' — dedicating the act to the ultimate reality.",
  },
  {
    id: "C18",
    title: "Chapter 18 — Liberation through renunciation (Moksha Sannyasa Yoga)",
    text: "Chapter 18, the final and longest chapter, synthesises all the Gita's teachings. Krishna distinguishes renunciation (sannyasa — giving up actions born of desire) from relinquishment (tyaga — performing duty while giving up attachment to results). He describes five causes of all action: the body, the individual self, the various organs, the different functions, and divine will — meaning no individual is ever the sole cause of any outcome. The chapter culminates in verse 18.66, often called the charama shloka or final instruction: 'Abandon ego, fear, and the illusion of sole authorship, and surrender to the divine — I will free you from all bondage, do not grieve.' This is not a call to stop acting. It is a call to act freely, without the paralysing weight of ego. Krishna then tells Arjuna to reflect carefully and do as he wishes — the choice remains Arjuna's.",
  },

  // ── KEY VERSES WITH REFERENCES ────────────────────────────────────────────

  {
    id: "V1",
    title: "Chapter 2, Verse 47 — You have a right to action, not to its fruits",
    text: "Bhagavad Gita 2.47 is the Gita's most cited verse: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.' This teaching is the heart of Karma Yoga. It means: act with full sincerity, but release the outcome. Act because it is right, not because of what you will get. This single principle, when genuinely practised, dissolves anxiety about results and transforms every action into a form of inner freedom.",
  },
  {
    id: "V2",
    title: "Chapter 2, Verses 19–20 — The soul is eternal and cannot be killed",
    text: "Bhagavad Gita 2.19–20 states: 'Both he who thinks the soul slays, and he who thinks the soul is slain, are ignorant. The soul neither slays nor is slain. The soul is never born, never dies; it did not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.' This is the Gita's foundational teaching on the immortality of the soul. It is the basis for releasing grief about death and for understanding that the deepest part of every person is beyond harm.",
  },
  {
    id: "V3",
    title: "Chapter 2, Verse 22 — The soul changes bodies like changing clothes",
    text: "Bhagavad Gita 2.22 says: 'Just as a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.' This analogy makes the soul's relationship to the body vivid and practical. Death is not destruction of the self; it is the self setting aside a worn-out form. This teaching is meant to comfort those who grieve for the dead and to help those who fear their own death understand that what is essential in them continues.",
  },
  {
    id: "V4",
    title: "Chapter 3, Verse 21 — The leader's example shapes the world",
    text: "Bhagavad Gita 3.21 states: 'Whatever the great persons do, common people follow. Whatever standards they set, the world follows.' This verse establishes the responsibility of leaders, teachers, and parents. If a person of influence acts with integrity, courage, and selflessness, those around them tend to do the same. If they act from greed or cowardice, that too spreads. The verse is an invitation to every person to consider what example they are setting — since each person is in some sense a leader to those who watch them.",
  },
  {
    id: "V5",
    title: "Chapter 4, Verse 7–8 — Krishna descends whenever dharma declines",
    text: "Bhagavad Gita 4.7–8: 'Whenever and wherever there is a decline in righteousness and an increase in unrighteousness, at that time I manifest myself. To deliver the righteous, to annihilate the wicked, and to re-establish the principles of dharma, I appear millennium after millennium.' This teaching gives meaning to history's cycles of rise and fall. It says that the universe has a self-correcting principle — when darkness becomes too deep, the divine re-enters to restore balance. For the individual, it means that no situation, however dark, is permanent or beyond redemption.",
  },
  {
    id: "V6",
    title: "Chapter 6, Verse 5 — Be your own best friend, not your own enemy",
    text: "Bhagavad Gita 6.5: 'Let a man lift himself by his own self alone; let him not lower himself, for this self alone is the friend of oneself, and this self alone is the enemy of oneself.' The Gita draws a sharp distinction between the higher and lower self. When you act from discipline, clarity, and values, the self is your best ally. When you act from impulse, craving, and avoidance, the self becomes its own adversary. Self-mastery, in the Gita's view, is the precondition for all other achievement and all genuine happiness.",
  },
  {
    id: "V7",
    title: "Chapter 9, Verse 22 — To those who worship with devotion, Krishna provides what they need",
    text: "Bhagavad Gita 9.22: 'To those who worship me with devotion, meditating on my transcendental form, I carry what they lack and preserve what they have.' This verse expresses the intimacy of the devotional path. The divine is not indifferent to the sincere seeker — it actively supports them. The teaching is not a promise of material prosperity but of inner provision: what is genuinely needed on the path of growth will be made available to the person who walks it with genuine devotion.",
  },
  {
    id: "V8",
    title: "Chapter 9, Verse 26 — Even a simple offering given with love is accepted",
    text: "Bhagavad Gita 9.26: 'If one offers me with love and devotion a leaf, a flower, a fruit, or water, I will accept it.' This verse democratises spiritual practice. The divine does not require elaborate ritual, expensive offerings, or learned recitation. A simple act offered from a genuine heart is fully received. This teaching has been deeply important in the Gita's cultural history — it means that no person is too poor, too uneducated, or too ordinary to have access to the divine.",
  },
  {
    id: "V9",
    title: "Chapter 11, Verse 33 — Arise, the victory is already yours",
    text: "Bhagavad Gita 11.33: 'Therefore arise, and attain glory. Conquer your enemies and enjoy a prosperous kingdom. All these warriors have already been put to death by my arrangement, and you, O Arjuna, can be but an instrument in the fight.' This verse, spoken by Krishna in his cosmic form, makes a radical claim: the outcome of events is determined by forces larger than any individual. The individual's role is to act as a conscious, willing instrument of their own deepest values — not to paralyse themselves with calculations about whether their effort will succeed.",
  },
  {
    id: "V10",
    title: "Chapter 12, Verses 13–14 — Qualities of the person most dear to Krishna",
    text: "Bhagavad Gita 12.13–14 describes the devotee most beloved: 'One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, who is always satisfied and engaged in devotional service with determination, and whose mind and intelligence are fixed on the divine — such a person is very dear to me.' These verses are often cited as the Gita's most direct description of the ideal human character — not heroic conquest, but quiet steadiness and genuine compassion.",
  },
  {
    id: "V11",
    title: "Chapter 16, Verses 1–3 — The divine qualities to cultivate",
    text: "Bhagavad Gita 16.1–3 lists the qualities of a person with a divine nature: fearlessness; purity of mind; steadfastness in spiritual practice; charity; self-control; sacrifice; study of the scriptures; austerity; straightforwardness; non-violence; truthfulness; freedom from anger; renunciation; tranquillity; aversion to fault-finding; compassion for all living beings; freedom from greed; gentleness; modesty; steady determination; vigour; forgiveness; patience; cleanliness; freedom from envy and from pride. These are not impossible ideals — each is a direction to grow into, gradually and consistently.",
  },
  {
    id: "V12",
    title: "Chapter 18, Verse 66 — True surrender: releasing ego, not abandoning duty",
    text: "Bhagavad Gita 18.66 is the Gita's final and most important instruction, known as the charama shloka: 'Abandon all dharmas and take refuge in me alone; I shall free you from all sins — do not grieve.' This verse is widely misread as a call to give up responsibility. It is the opposite. Krishna is asking Arjuna to abandon ego (the claim to be the sole author of outcomes), fear (paralysis about what might go wrong), and false pride (the belief that success depends entirely on him). Surrendering to the divine means acting with full effort and full courage while releasing the desperate grip on results. The surrendered person acts better, not less — because they are no longer held back by the need to guarantee the outcome before beginning.",
  },
  {
    id: "V13",
    title: "Chapter 2, Verse 14 — Pleasure and pain are temporary — endure them",
    text: "Bhagavad Gita 2.14: 'O son of Kunti, the non-permanent appearance of happiness and distress, and their disappearance in due course, are like the appearance and disappearance of winter and summer seasons. They arise from sense perception, and one must learn to tolerate them without being disturbed.' This teaching is the Gita's most direct counsel on emotional resilience. Difficult feelings are real, but they are not permanent. Just as cold passes and warmth returns, sorrow passes. The skill is not to pretend the feeling is not there, but to know it will not last and not build one's life around it.",
  },
  {
    id: "V14",
    title: "Chapter 2, Verse 62–63 — How anger destroys wisdom (the chain of destruction)",
    text: "Bhagavad Gita 2.62–63: 'While contemplating the objects of the senses, a person develops attachment for them, and from such attachment desire develops, and from desire anger arises. From anger, complete delusion arises, and from delusion bewilderment of memory. When memory is bewildered, intelligence is lost, and when intelligence is lost one falls down again into the material pool.' This is the Gita's map of how a moment of unchecked craving escalates into the destruction of clear thinking. Each link in the chain can be broken — but the earlier the break, the easier.",
  },
  {
    id: "V15",
    title: "Chapter 3, Verse 16 — Live in reciprocity, not just taking",
    text: "Bhagavad Gita 3.16: 'One who does not follow the cycle of sacrifice established in the Vedas and thus does not contribute to its maintenance is living in vain — such a person lives only for the gratification of the senses.' The Gita's concept of yajna (sacrifice or offering) is essentially about reciprocity — the understanding that we receive from the world (air, water, food, knowledge, care from others) and we have a responsibility to give back in turn. A purely self-serving life, in the Gita's view, is spiritually empty regardless of how much it accumulates.",
  },

  // ── LIFE TOPICS — EXPANDED ────────────────────────────────────────────────

  {
    id: "D1",
    title: "Chapter 2 — The eternal self",
    text: "In Chapter 2, Krishna tells Arjuna that the true self (Atman) is eternal, unborn, and untouched by death; only the body perishes. Grieving over death is described as a confusion of the self with the body. The chapter introduces the idea that wisdom means acting according to one's duty while staying even-minded about outcomes, often summarised as having a right to act but not a right to the fruits of the action.",
  },
  {
    id: "D2",
    title: "Chapter 3 — The path of action (Karma Yoga)",
    text: "Chapter 3 argues that no one can remain entirely without action, since nature compels it. Rather than renouncing action, the recommended path is to perform one's own duty (svadharma) without selfish attachment to the results, treating action as a kind of offering. Inaction born of confusion or avoidance is described as inferior to disciplined, selfless action.",
  },
  {
    id: "D3",
    title: "Chapter 12 — The path of devotion (Bhakti Yoga)",
    text: "Chapter 12 presents loving devotion to a personal God as an accessible path, especially for those who find abstract meditation difficult. Qualities praised include freedom from hatred, compassion, humility, contentment, and equanimity in pleasure and pain. Devotion is framed as compatible with, not opposed to, the paths of knowledge and action.",
  },
  {
    id: "D4",
    title: "Chapter 18 — Synthesis of the three paths",
    text: "The closing chapter reviews the paths of knowledge (jnana), action (karma), and devotion (bhakti) as complementary approaches suited to different temperaments. It emphasises performing one's own duty, even imperfectly, over performing someone else's duty well, and ends by pointing toward surrender to the divine as the culmination of the teaching.",
  },
  {
    id: "D5",
    title: "Classical commentaries — differing views on liberation",
    text: "Indian philosophical schools interpret the Gita's central aim differently. Adi Shankara's Advaita Vedanta commentary treats liberation (moksha) as realising that the individual self is not separate from ultimate reality (Brahman). Ramanuja's Vishishtadvaita commentary centres loving surrender to a personal God as the highest aim. Madhva's Dvaita tradition holds that the self remains eternally distinct from God, with devoted service rather than merger as the goal.",
  },
  {
    id: "D6",
    title: "Modern interpreters — Gandhi and Vivekananda",
    text: "Mahatma Gandhi read the Gita mainly as a guide to selfless, non-violent action, using its teaching on acting without attachment to results to support his practice of satyagraha, and treated the battlefield setting as symbolic rather than literal. Swami Vivekananda emphasised strength, fearlessness, and duty as practical teachings usable outside any single religious framework. These modern readings differ from the classical commentaries' focus on metaphysical liberation.",
  },

  // ── Purpose, meaning, soul ────────────────────────────────────────────────

  {
    id: "D7",
    title: "What is the purpose of life according to the Gita?",
    text: "You are not here to accumulate, to be admired, or even to be happy in the way the world defines happiness. You are here to remember what you are. The purpose of life, as the Gita teaches it across every chapter, is to recognise your true nature as the eternal Self — the Atman — and to live from that recognition rather than from the fears and cravings of the ego. This recognition does not come through withdrawal from the world. It comes through engaging with the world fully: discovering your authentic duty, performing it without selfish attachment to reward, and offering every act to something larger than yourself. Each action performed with full sincerity and released without desperate clinging becomes, over time, a form of purification. The ego grows quieter. The self grows clearer. And gradually, the inner freedom — Moksha — that no circumstance can give and no circumstance can take away begins to be felt. That is what this life is for.",
  },
  {
    id: "D8",
    title: "Finding meaning when life feels pointless or empty",
    text: "The feeling that nothing matters — that your effort disappears without a trace, that the world continues indifferently — is one of the most painful things a human being can experience. And yet the Gita meets you there with startling honesty: meaning was never located in the outcome. It never was. Victories dissolve, recognition fades, rewards stop satisfying. The source of genuine meaning is not what you achieved but the quality of attention, care, and integrity you brought to the act of living. When you act from your deepest values — fully, honestly, without calculating the reward — something shifts. The emptiness is not filled from outside. It is seen for what it was: the gap between who you are and how you have been living. Close that gap, even slightly, and meaning begins to return. Not because the world changed. Because you did.",
  },
  {
    id: "D9",
    title: "Soul, self, and identity — who am I really?",
    text: "You are not your body. You are not your name, your role, your reputation, your history of failures and successes. These are garments the soul wears — real and useful while worn, but not what you are. Beneath all of it, unchanged by any of it, is the Atman: pure awareness, the witnessing presence that has watched every experience you have ever had without being destroyed by a single one. This self does not age. It is not diminished by failure. It does not grieve. It was never born and will never die. When you act from this self — even briefly, even in glimpses — everything changes. Fear becomes less total. Loss becomes bearable. Decisions become clearer. The Gita calls the recognition of this difference — between the temporary outer self and the eternal inner one — the beginning of all genuine wisdom. Everything else the Gita teaches rests on this single understanding.",
  },
  {
    id: "D10",
    title: "What happens to the soul after death? Is there life after death?",
    text: "The soul does not die when the body dies. This is not consolation — it is the Gita's most foundational claim, stated at the very beginning of Krishna's teaching because without it, everything else collapses into fear. Just as you set aside worn clothing and put on new, the soul sets aside the worn body and continues its journey. Death is a transition, not an ending. This does not mean loss is not real — the body that held a particular face, a particular voice, a particular warmth is genuinely gone, and that loss deserves its grief. But the grief that believes the person is simply nowhere, that the love you shared has vanished into nothing — that grief is resting on a misunderstanding. What you loved was always more than a body. What you loved continues. Only the form has changed.",
  },
  {
    id: "D11",
    title: "Why do good people suffer and bad people seem to succeed?",
    text: "This question has burned in human hearts as long as there have been human hearts. The Gita does not offer a clean answer, because there is no clean answer that does not dishonour the reality of suffering. What it does offer is this: the results of action unfold across a larger arc than any single life can see. A person who acts with genuine integrity may not be protected from pain — the Gita never promises that. What they are protected from is the inner collapse that comes from abandoning their values to chase what others appear to have. The person who sees a dishonest life appearing to succeed and therefore becomes dishonest has traded their freedom for a comparison. Focus not on what the world hands to others. Focus on the quality of who you are becoming through how you act. That is the only ledger that matters, and it is the only one you have any genuine authority over.",
  },

  // ── Success, failure, resilience ──────────────────────────────────────────

  {
    id: "D12",
    title: "How to deal with failure and bounce back",
    text: "You gave it everything and it still didn't work. That is one of the hardest human experiences — not because failure is shameful, but because it forces you to face yourself without the armour of achievement. The Gita's word for what you need in this moment is samatvam: evenness of mind, equanimity. Not the false evenness of someone pretending not to care, but the deep steadiness of a person who has rooted their identity somewhere the outcome cannot reach. Failure is not a verdict on your worth. It is information — precise, honest, often uncomfortable information — about where your understanding was incomplete, where your preparation fell short, or simply where circumstances beyond your control intervened. Look at it clearly. Correct what can be corrected. Then return to action with the same full commitment you brought the first time — not with bravado, not with self-pity, but with the quiet dignity of a soul that knows it is not reducible to what happened on any single day.",
  },
  {
    id: "D13",
    title: "Fear of failure — how to overcome it and take risks",
    text: "You know what you should do. You can feel it clearly. And yet the fear of getting it wrong keeps you exactly where you are — safe, stalled, and slowly losing the very confidence you are trying to protect. The Gita addresses this with striking directness: the soul cannot be diminished, cannot be wounded, cannot be made less than it was by anything that happens on any battlefield. The fear of failure has so much power over you precisely because you have placed your entire identity on top of the outcome. When the outcome fails, the identity collapses. But that identity was never the real you. Your authentic self — the Atman — has never once been placed at risk by any of your choices. When you begin to act from that understanding — giving everything, caring deeply, releasing the need to guarantee the result before you begin — you become, paradoxically, far more capable. Because you are no longer managing your own fear instead of doing the work.",
  },
  {
    id: "D14",
    title: "Achieving success — what the Gita says about goals and ambition",
    text: "There is nothing wrong with wanting to succeed. The Gita never asks Arjuna to want less or to lower his effort. It asks him to examine where his energy is going. When the central question is 'what will I get?' — performance deteriorates. Anxiety about outcomes crowds out attention to the work itself. Impressions are managed instead of real things being done. The Gita's teaching is not a call to reduced ambition. It is a call to redirected ambition: let your goals be grounded in your genuine values and your authentic duty, give them your complete effort, and release the desperate grip on the result. This is not resignation — it is the most effective way to act. A person who is no longer hostage to the outcome is free to do the work at its fullest. Success, when it comes, becomes a teacher. Failure, when it comes, becomes a teacher. Both lose their power to define you, and you become more capable of meeting either.",
  },
  {
    id: "D36",
    title: "How to stay motivated during a long struggle or hard times",
    text: "Motivation that depends on results will always fail you — because results take time, arrive unevenly, and sometimes do not come at all for stretches that feel impossible. If you need to see the reward in order to keep moving, you will stop when the reward is hidden. The Gita offers a completely different source of fuel: purpose. When you are clear about what you are here to do — not what you hope to gain, but what you genuinely value and what your situation genuinely requires of you — you can move through long periods of darkness without being derailed by them. The action itself becomes the answer. Every day you show up, every act performed with integrity regardless of whether anyone notices, is not lost. It is building something the Gita calls inner strength — and it accumulates in the dark just as steadily as it does in the light.",
  },
  {
    id: "D37",
    title: "Dealing with criticism, rejection, and being misunderstood",
    text: "Criticism lands hardest when your entire sense of self is built on other people's opinion of you. The Gita describes the Sthitaprajna — the person of steady wisdom — as someone who is not elated by praise or shattered by criticism. This is not indifference. It is a fundamentally different foundation. When you know who you are at the level of the soul — not the level of your reputation — criticism becomes information rather than verdict. Sometimes the critic is right, and their words are a gift. Sometimes they are wrong, and their words are simply weather. The practice of discerning between these two — openly, without defensive rage or defeated collapse — is one of the most practically useful things the Gita teaches. It does not ask you to stop caring what others think. It asks you to care more about what is actually true.",
  },

  // ── Sadness, grief, depression, anxiety ───────────────────────────────────

  {
    id: "D15",
    title: "How to overcome sadness, depression, and despair",
    text: "If you are reading this in the middle of real pain — the Gita begins exactly where you are. Arjuna sat down on the battlefield, weapons slipping from his hands, unable to breathe, unable to see the point. Krishna did not look away. He did not say 'think positive' or 'be strong.' He sat with Arjuna and listened to every word of his despair. Then, gently and completely, he began to show him something: what you are suffering from is not weakness. It is a case of mistaken identity. You have confused the storm — the grief, the confusion, the fear, the darkness — with who you are. But you are not the storm. Pleasure and pain come and go like the seasons. Winter is real. It is cold. It is hard. But it is not permanent, and it is not you. Somewhere beneath the pain — underneath even the numbness — there is something steady and alive that has been present through every experience you have ever had. That something is your true self. It has never once been destroyed. And it is there right now, waiting for you to rest in it.",
  },
  {
    id: "D16",
    title: "Dealing with grief and loss of a loved one",
    text: "The Gita's treatment of grief is one of its most tender passages. Krishna does not dismiss Arjuna's grief or tell him it is irrational. He acknowledges it completely — and then offers a larger view, slowly, like someone opening a window to let in air. The person you have lost has not simply ceased to exist. Only the body, which was always temporary, has come to its end. The soul — the essential person, the one you loved at their deepest — continues its journey. This does not mean the loss is not real. The specific warmth, the voice, the face, the presence in the room — these are genuinely gone, and they deserve your grief. But the belief that the person is simply nowhere, that the love you shared has dissolved into nothing — that belief is resting on a misunderstanding of what a person is. What you loved was always more than a body. And what is more than a body continues.",
  },
  {
    id: "D17",
    title: "Anxiety, worry, overthinking, and restless mind — finding peace",
    text: "Your mind will not stop. It replays yesterday's conversation, rehearses tomorrow's disaster, compares your insides to everyone else's outsides — and somewhere in the middle of all that noise, the present moment slips away entirely. You are tired of it. You have tried to stop it and the trying only adds more noise. Krishna names this precisely in Chapter 6: the restless mind is the greatest obstacle on the path, more difficult to master than the wind. He does not pretend otherwise. But then he says something important: the mind is not mastered by force. It is mastered by practice — the patient, gentle, daily practice of bringing it back to the present moment without punishing yourself every time it wanders. Each time the mind drifts and you notice, and you return — without drama, without self-criticism, just quietly back — you are building something. Bring your whole attention to what is directly in front of you right now. Not the outcome. Not the worst-case future. Just this action, this moment, this breath. What remains when the mind's stories quiet even briefly is not emptiness. It is something alive and real that has been there underneath the noise the whole time.",
  },
  {
    id: "D18",
    title: "Feeling lost, confused, or without direction in life",
    text: "Feeling lost is not a sign that something is deeply wrong with you. It may be the first honest thing you have felt in a long time. Arjuna's crisis at the opening of the Gita is precisely this: he does not know what is right, does not know what to do, does not know who to trust — including himself. Krishna treats this crisis not as weakness but as the beginning of genuine inquiry. The confusion you are feeling right now may be the moment when the surface answers have finally run out and you are being pushed toward deeper ones: Who am I, really? What do I actually value? What is genuinely mine to do? The Gita's answer to confusion is not a shortcut. It is an invitation to examine the assumptions underneath the confusion — to question not just what to decide, but who is doing the deciding, and from what foundation.",
  },
  {
    id: "D38",
    title: "Stress, burnout, and feeling overwhelmed by responsibilities",
    text: "The weight you are feeling is real. And yet the Gita suggests that much of what makes responsibility crushing is not the work itself but the way you are holding it — as though every outcome rests entirely on you, as though failure would be catastrophic and permanent, as though the whole edifice will collapse if you let go of it for a single moment. This is the ego's way of relating to action: total ownership, total anxiety. The Gita offers a fundamentally different relationship to work. Five factors shape every outcome, not one — the body, the self, the instruments of action, the various functions, and the divine will that operates through all of them. You are not the sole cause of any result. Do your part completely and with full care. Then release what is not yours to carry. The burden lightens not because the work decreases but because you are no longer carrying what was never yours.",
  },
  {
    id: "D39",
    title: "Suicidal thoughts, wanting to give up on life",
    text: "The Gita begins with Arjuna saying he does not want to live. He tells Krishna he sees no reason to go on, that winning means nothing, that existence has lost its point. This is treated with complete seriousness — not dismissed, not rushed past, not resolved with a lecture. Krishna sits with Arjuna in it. If you are in a place where life feels impossible right now, please reach out to someone who can be with you — a crisis line, a person you trust, a doctor. You do not have to hold this alone. What the Gita says to you at the deepest level is this: what you are, at the core — the awareness that is watching this pain, that is asking this question — that has never once been broken. The situation you are in, however dark, is not permanent. And the soul you are is not diminished by any of it.",
  },

  // ── Relationships, love, family ───────────────────────────────────────────

  {
    id: "D19",
    title: "Love, relationships, and the difference between love and attachment",
    text: "The Gita makes a distinction that takes a lifetime to fully understand: the difference between love and attachment. Love, in the Gita's sense, is the genuine care for another person's wellbeing — given freely, without conditions, without needing the person to remain a certain way in order for your peace to hold. Attachment is something different. It is the clinging that turns the beloved into a source of your identity or security — so that when they change, when they leave, when they disappoint, your whole sense of self shakes. The Gita does not ask you to love less. It asks you to love more freely. A love that does not need the other person to guarantee your inner state is not a colder love — it is a purer one. It is the only love that can survive time, change, and loss without becoming bitterness.",
  },
  {
    id: "D20",
    title: "Loneliness and the feeling of being alone or isolated",
    text: "Loneliness has two layers. The outer layer is the absence of people — and that is real, and the Gita does not dismiss the need for genuine human connection. But beneath it is a deeper loneliness that no amount of company can fully resolve: the feeling of being estranged from yourself. When you are not at home in your own inner life — when you avoid silence, when you fill every moment to keep from being alone with your own thoughts — no gathering of people can touch that ache. The Gita's teaching on this is gentle but direct: turn inward. Not to escape the world, but to discover the companionship that is always present, that does not depend on whether anyone else is in the room. That inner presence — what the Gita calls the self — is the most reliable company there is. Everything else is addition.",
  },
  {
    id: "D40",
    title: "Heartbreak, breakup, and losing someone you love",
    text: "Heartbreak is one of the most physically real of all pains — it lands in the body, not just the mind, and there is no shortcut through it. The Gita does not offer one. What it offers is a question that, when you are ready for it, can begin to change the shape of the pain: were you loving the person, or were you loving what the person made you feel? Both are real. But love that is genuinely free — offered without the need to possess or control, without making your peace entirely dependent on their presence — survives separation in a way that attachment cannot. The loss is still a loss. The grief is still grief. But it does not have to become a permanent prison. Gradually, the practice of releasing the grip — not the love, only the grip — is one of the most difficult and most liberating things the Gita's teaching asks of us.",
  },
  {
    id: "D41",
    title: "Family conflict, duty to family, and difficult relationships",
    text: "The entire Gita is born from a family conflict. Arjuna is about to fight his own teachers, his grandfather, his cousins, people he loves. The Gita does not pretend this is simple or that love makes difficult duties disappear. It asks a harder question: what does genuine care for everyone involved — including yourself — actually require? Sometimes the most loving thing is not accommodation. Sometimes it is honest confrontation, the refusal to pretend that something harmful is acceptable, the willingness to hold a boundary even when it causes pain. The Gita does not say family comes first always. It says your dharma — your authentic duty, including your duty to your own integrity — must be lived, even when those closest to you wish you would live differently.",
  },
  {
    id: "D42",
    title: "Forgiveness — how to forgive and let go of resentment",
    text: "Forgiveness is listed in the Gita among the qualities of a person with a genuinely free and mature soul. It is not listed as a nicety or a social grace. It is listed as a form of liberation — for you, not primarily for the person who wronged you. When you hold resentment, the past act of another person continues to live rent-free in your present moment. Every day you carry it, they are still there, still shaping your experience, still taking up space in your life. Forgiveness does not say the harm was acceptable. It does not require reconciliation or trust. It simply says: I am releasing the grip. I am choosing not to let what happened then be the author of who I am now. That release is one of the most genuine forms of freedom the Gita describes.",
  },

  // ── Fear, courage, confidence ─────────────────────────────────────────────

  {
    id: "D21",
    title: "Overcoming fear — courage and inner strength",
    text: "Fearlessness — abhaya — is listed in the Gita not as a personality trait but as a natural consequence of genuine wisdom. Fear is not a character flaw. It is what happens when a person has placed their deepest identity in something that can be taken away. When you believe you are the body, the reputation, the achievement, the relationship — all of which are temporary — fear makes perfect sense. Of course you are afraid. Everything you have built your selfhood on can be lost. But when you begin to know yourself as the Atman — the awareness that has watched every experience without being destroyed by any of them — the roots of most fears begin to loosen. This is not bravado. It is a different understanding of what you are. And from that understanding, you can act in the presence of fear without being paralysed by it. That is what the Gita calls courage.",
  },
  {
    id: "D22",
    title: "How to be mentally strong and resilient — not give up",
    text: "There will be a morning when you have done everything right and it has still gone wrong. When the effort was genuine, the intention was honest, and the outcome was neither fair nor kind. That morning is exactly what the Gita is preparing you for. The Sanskrit word is dhrti — steadfast resolve. Not the resolve that comes with confidence and inspiration. The resolve that shows up on the hard mornings when there is no inspiration left, only duty. Real mental strength is not the absence of doubt. It is continuing in the presence of doubt because you know what you stand for. Every time you act with integrity when it would have been easier not to, you build something the Gita calls sthitaprajna — the steady, unshakeable mind. That steadiness is not constructed in the good times. It is forged in exactly the moments you are describing.",
  },
  {
    id: "D35",
    title: "Self-confidence and self-worth — how to believe in yourself",
    text: "The confidence you are looking for is not the kind that depends on everything going right, on people approving of you, on the last thing you attempted working out. That kind of confidence is built on sand — it feels real when conditions support it and collapses when they don't. The Gita points to a different foundation entirely. You are the Atman — the unchanging awareness that witnesses your thoughts, your fears, your worst moments and your best ones, without being any of them. That is what you are at the core. Not your performance record. Not your worst day. Not the version of you that someone once dismissed. Vivekananda, reading this teaching, said something that still rings: 'Have faith in yourselves — not the arrogant faith of ego, but the calm faith of the soul that knows it cannot be diminished.' That is the confidence the Gita is pointing toward. And it is not something you earn. It is something you remember.",
  },
  {
    id: "D43",
    title: "Imposter syndrome — feeling unworthy or like a fraud",
    text: "The feeling that you do not deserve where you are — that at any moment someone will notice you don't really belong — is rooted in a specific mistake: measuring your worth by your achievements. When achievements are the foundation of identity, you are only as secure as your last performance. And since you know the inner life behind the performance — the doubts, the uncertainty, the moments of confusion — the gap between who you appear to be and who you feel you are seems enormous. The Gita's response to this is not to perform more convincingly. It is to question the premise. If the self is deeper than any achievement, then neither success nor failure is the final word on who you are. Do your work with the best of your ability. Stop comparing your interior to others' exteriors. And know — not as an idea, but as a felt reality — that your worth is not constructed by your performance.",
  },

  // ── Happiness, peace, contentment ─────────────────────────────────────────

  {
    id: "D23",
    title: "What is true happiness and how to find real joy",
    text: "You have had moments where you got exactly what you wanted — and then, days or hours later, found yourself standing in the middle of what you wanted, still vaguely hollow. That is not a personal failure. That is what the Gita is pointing at with absolute precision. Pleasure is real, but it is borrowed. It depends on conditions continuing to cooperate, which they never do indefinitely. And when the pleasure ends, the craving begins again, slightly more insistent than before. Real happiness — what the Gita calls the joy of the inner self, the ananda that does not depend on circumstances — is a completely different category of experience. It arises when you are so fully absorbed in what you are doing that the gap between you and the act disappears. It arises when the distance between how you are living and what you genuinely value begins to close. It arises in moments of genuine service, genuine presence, genuine love freely given. The Gita is not asking you to give up pleasure. It is showing you that something far more durable exists — and that you have already touched it in your best moments.",
  },
  {
    id: "D24",
    title: "How to be at peace with yourself and find inner peace",
    text: "The peace you are looking for is not waiting for all your problems to be solved. If it were, no one would ever find it — because problems do not end; they only change their shape. Inner peace, in the Gita's understanding, is not a condition that follows from everything going right. It is a quality of attention — the practice of being so completely present with what is directly in front of you that the mind's constant argument with reality begins to loosen its grip. The Gita describes a person at peace as someone who does not agitate the world and is not agitated by it. Not because nothing touches them. Because nothing can collapse the foundation they are standing on. That foundation is the self that is present beneath every experience — steady, aware, and fundamentally unthreatened. You can begin building that foundation today, not by waiting for peace to arrive, but by practising being here.",
  },
  {
    id: "D44",
    title: "Gratitude, contentment, and santosha — being satisfied with what you have",
    text: "Contentment — santosha in Sanskrit — is not giving up on growth or settling for less than you are capable of. The Gita is strongly in favour of full effort and full engagement. Contentment is something quieter and more radical: the recognition that your sense of inner sufficiency does not have to wait for more. The person who needs one more achievement, one more acquisition, one more validation before they can feel whole will spend their life in that perpetual anteroom. The Gita draws a clean line between genuine need — which is real and worth attending to — and compulsive accumulation, which is a form of bondage that always asks for more and never quite delivers what it promised. Gratitude is the daily practice of noticing what is already here. It does not require a perfect life. It requires presence.",
  },

  // ── Karma, dharma, destiny, free will ─────────────────────────────────────

  {
    id: "D25",
    title: "What is karma? How does karma actually work?",
    text: "Karma means action — and at its deepest level, the law of karma means that everything you do leaves a trace. Not in some ledger of cosmic punishment and reward, but in the most intimate place: your own character. Actions shape habits. Habits shape the kind of person you are becoming. The kind of person you are becoming shapes the quality of your attention, your choices, your relationships, and the texture of your inner life. This is how karma actually works. The Gita's central teaching on karma is not passive — it is the most engaged teaching imaginable: act with your whole effort, with your full integrity, and then release the outcome. You are not entitled to choose the result. You are absolutely responsible for the quality of the action. That responsibility — owned fully, without excuse — is the heart of the teaching.",
  },
  {
    id: "D26",
    title: "Is my life already decided? Fate, free will, and destiny",
    text: "The Gita does not present a fully pre-determined universe. Much lies outside your control — the family you were born into, the circumstances you inherit, the actions of others. The Gita acknowledges all of this without flinching. But inside those circumstances — in the space between what happens and how you respond — genuine freedom lives. The quality of your attention, the honesty of your effort, the values you choose to act from: these are genuinely yours. A person is not simply the product of their past. The Gita's entire teaching rests on the fact that conscious choice, disciplined practice, and genuine devotion can fundamentally change the kind of person you are. That capacity for change is your freedom. It is also your responsibility.",
  },
  {
    id: "D45",
    title: "What is dharma? How do I know what my dharma is?",
    text: "Dharma is one of those words that carries more weight than any single translation can hold. It means cosmic order, ethical law, and — most immediately and practically — your own authentic duty: the work that is genuinely yours to do, suited to your nature and your situation. Svadharma — your own dharma — is not mystical. It is found through honest self-examination: What are your genuine capacities, not the ones you wish you had, but the ones you actually possess? What does your situation genuinely require of you? What can you do with full integrity and full-hearted engagement? The Gita is unambiguous: performing your own dharma imperfectly is better than performing someone else's dharma brilliantly — because only your own dharma can be lived with genuine wholeness. Living it with courage, even when it is costly, is the foundation on which everything else the Gita teaches rests.",
  },
  {
    id: "D46",
    title: "Why do bad things happen to good people? Why is life unfair?",
    text: "The Gita does not offer a tidy explanation for why suffering falls on good people. Any answer that comes too easily would dishonour the reality of genuine pain. What the Gita does say is this: the full consequences of action unfold across a timescale larger than any single life can measure. What looks like injustice from inside a single moment may look entirely different from a wider view. But more practically — and more usefully — the Gita invites you to notice where your attention is. Every moment spent in outrage at the unfairness of what cannot be changed is a moment not spent on the quality of what you are actually doing. This is not asking you to accept injustice passively. It is asking you to put your energy where it genuinely belongs: on the action that is yours to take, done as well and as honestly as possible.",
  },

  // ── Anger, ego, emotions ───────────────────────────────────────────────────

  {
    id: "D27",
    title: "How to control anger and manage the ego",
    text: "The Gita maps the chain of destruction with startling precision: desire arises, desire is blocked, frustration becomes anger, anger produces delusion, delusion destroys the capacity for clear thought, and clear thought lost means the person is no longer themselves. Every link in that chain can be broken — but the earlier the break, the easier. The root of both anger and ego is the same: attachment. You have made your sense of who you are dependent on something outside yourself — a result, a status, an image, the approval of someone specific. When that thing is threatened, the self feels threatened. The Gita's long-term answer to anger is not better anger management. It is the gradual loosening of that identification — coming to know yourself as something that cannot be threatened by any of the things you have been afraid of losing.",
  },
  {
    id: "D28",
    title: "Jealousy, comparison, and envy — how to stop comparing yourself to others",
    text: "Comparison is the mind's way of measuring the wrong things. You see the outside of another person's life and compare it to the inside of your own — and then wonder why you always seem to fall short. The Gita's concept of svadharma — your own authentic path — carries within it the understanding that no two lives are genuinely comparable. Your life has a particular set of gifts, circumstances, and duties that belong to you alone. Measuring it against someone else's is like trying to understand a river by comparing it to a mountain. They are not on the same scale. The person who is fully absorbed in living their own life — discovering and walking their own path — has very little energy left for envy. Not because they are indifferent to others, but because they are genuinely occupied.",
  },
  {
    id: "D47",
    title: "Pride, arrogance, and humility",
    text: "The Gita identifies arrogance and excessive pride as among the most spiritually dangerous qualities a person can cultivate — not because pride is always wrong, but because false pride cuts a person off from learning, from genuine relationship, and from the very wisdom they need. There is a quiet confidence the Gita endorses: the calm certainty of a person who knows their own nature, who does not need to prove it, and who therefore does not need to diminish others. That is very different from the restless, comparative pride of someone who requires constant confirmation of their superiority. Humility, in the Gita's understanding, is not low self-opinion. It is accurate self-opinion — which turns out to be both freeing and grounding at the same time.",
  },

  // ── Work, purpose, calling ─────────────────────────────────────────────────

  {
    id: "D29",
    title: "How to find motivation when you feel completely unmotivated",
    text: "The loss of motivation is not laziness. It is often what happens when you have been working for the wrong reasons for too long — for approval, for security, for an outcome that never quite arrives — and the engine has run dry. The Gita's response is not to offer new incentives. It is to help you find what you actually care about. Not what you think you should care about. Not what others expect you to pursue. What genuinely matters to you — at the level of your real values, your authentic nature, your honest sense of what is worth doing with a human life. When action flows from that source, it does not need to be motivated from outside. It carries its own energy. The question is not 'how do I get motivated?' The question is 'what am I doing this for?' Answering that honestly is where motivation finds its ground.",
  },
  {
    id: "D30",
    title: "How to find your passion and life's calling or purpose",
    text: "The Gita's concept of svadharma — your own calling — is not a romantic notion of a single destiny waiting to be discovered. It is something more grounded and more demanding: the honest identification of what you are genuinely capable of, what the world genuinely needs from you, and what you can do with full-hearted engagement rather than performance. This is not found in a revelation. It is found through living honestly, paying attention to where your energy feels most alive and most useful, and being willing to let the answer be different from what you expected or what others hoped for you. The Gita is unambiguous: your own imperfect path, lived with courage, is worth infinitely more than someone else's excellent path, lived with imitation.",
  },
  {
    id: "D31",
    title: "Work-life balance, overwork, and finding meaning in your job",
    text: "The Gita does not frame work and life as opposing forces that need to be balanced against each other. That framing itself may be part of the problem. When work is something you endure in order to fund the life you want elsewhere, both become diminished. The Gita's teaching is not about the division of time. It is about the transformation of relationship. When you bring genuine presence to your work — when you do it as a form of service rather than a transaction, when you release the obsessive grip on results and focus on the quality of the doing — the boundary between work and life softens. Not because the hours change, but because the quality of attention does. Meaning is not found in a better schedule. It is found in a more honest relationship with what you are already doing.",
  },
  {
    id: "D48",
    title: "Leadership, responsibility, and setting an example",
    text: "The Gita places a specific and serious responsibility on anyone who holds influence over others. Whatever the person of standing does, others follow. Whatever standards they set — through action, not just words — become the standards that surround them. This is not a burden to resent. It is the natural weight of genuine authority. The Gita's ideal leader does not act from fear of failure or hunger for status. They act from dharma — from a genuine sense of what is right, what serves those in their care, and what they themselves would choose if no one was watching. That consistency between private values and public action is what the Gita calls integrity, and it is the only form of leadership that earns lasting trust.",
  },

  // ── God, spirituality, meditation, yoga ───────────────────────────────────

  {
    id: "D32",
    title: "Does God exist? What does the Gita say about God and the divine?",
    text: "The Gita does not demand that you accept a single view of God before it will speak to you. It holds multiple understandings simultaneously and with remarkable generosity. For those who need a personal God — a presence they can love, pray to, and feel loved by — the Gita offers Chapter 12's description of the intimate devotional relationship. For those who find the personal God too small or too human — who sense the divine more as the infinite ground of all consciousness — the Gita offers the impersonal Brahman, the pure awareness that underlies and pervades everything. What the Gita does insist on is this: there is more to reality than the ego can see, more to you than the body and mind, and the deepest movement of life is toward a freedom and fullness that the ego alone can never provide. Whatever honest path leads you toward that recognition — that is the path the Gita will honour.",
  },
  {
    id: "D33",
    title: "How to meditate, quiet the mind, and start a meditation practice",
    text: "Meditation is simpler and harder than almost anything else. The instructions are not complex: sit, bring your attention to a single point — the breath, a word, the sensation of being alive — and when the mind wanders, which it will, simply bring it back. That is the entire practice. The difficulty is that the mind wanders constantly, and every wandering feels like a failure. It is not a failure. It is the practice. Each return — unhurried, without self-criticism, simply a gentle redirection of attention — is a repetition of the most important movement in a human life: the movement back to the present moment, back to awareness, back to what is actually here. The Gita says the mind is mastered through two things: consistent practice (abhyasa) and gradual non-attachment (vairagya). Not force. Not punishment. Patient, regular return. That is all.",
  },
  {
    id: "D34",
    title: "What is the meaning of suffering and why do we suffer?",
    text: "The Gita traces the root of suffering to two interlocking causes: attachment and ignorance of the true self. Attachment is the clinging that makes your peace entirely conditional on things remaining a certain way — a relationship not ending, a health not failing, a status not being lost. When conditions change — and they always do — the suffering is proportional to the attachment. Ignorance deepens this: when you believe the temporary, changing aspects of life are all there is to reality, every change feels like a threat to your entire existence. When you begin to know that you are something deeper and more permanent than any of these conditions — that the Atman at your core is not touched by what touches the body and mind — the acute edge of suffering begins to dull. Not because the losses stop. Because you are no longer only the thing that is losing.",
  },
  {
    id: "D49",
    title: "What is yoga? The different paths of yoga in the Gita",
    text: "The word yoga comes from the Sanskrit yuj — to yoke, to join, to unite. Every path of yoga in the Gita is a different way of joining the individual self with the universal: a different door into the same room. Jnana Yoga is the path of knowledge and self-inquiry — the direct investigation of who you actually are, stripping away each mistaken identification until what remains is the pure awareness that cannot be further reduced. Karma Yoga is the path of selfless action — doing what is yours to do with full effort and without clinging to the result, so that every act becomes a form of offering. Bhakti Yoga is the path of love and devotion — the heart's turning toward the divine in all things, which opens a depth of connection that reason alone cannot reach. Raja Yoga is the path of meditation and inner discipline — the systematic training of attention until the mind becomes an instrument of clarity rather than a source of noise. The Gita does not insist you choose one. Most people live at the intersection of several, and the Gita meets them there.",
  },
  {
    id: "D50",
    title: "Prayer, devotion, and the relationship between a person and God",
    text: "Prayer in the Gita is not a formal request made to a distant authority. It is a turning of attention. A reorientation. The moment when a person stops trying to manage everything alone and acknowledges that something larger than the ego is operating — and that aligning with that something is wiser than fighting against it. Chapter 9 describes the divine as the father, mother, sustainer, and closest companion of every being. Not remote. Not indifferent. Not waiting to be earned. Already present, already intimate, already here — awaiting only the turning of your attention. Even the smallest offering — a leaf, a flower, water — given from a genuine heart is received completely. The quality of the turning matters infinitely more than the elaborateness of the gesture.",
  },
  {
    id: "D51",
    title: "Reincarnation, rebirth, and the soul's journey across lifetimes",
    text: "The Gita's cosmology includes the soul's journey across multiple lifetimes — not as a punishment or a treadmill, but as the natural arc of a consciousness that is working its way toward full recognition of its own nature. The quality of the mind at the moment of death — what one has thought about, clung to, loved, and valued — shapes the conditions of the next beginning. This is not determinism. It is an invitation: every genuine movement toward wisdom, every sincere act of integrity, every moment of real love freely given — none of this is lost. It accumulates. The soul carries it forward. Liberation — Moksha — is the eventual freedom from this cycle: not through escape from the world, but through such complete recognition of the self's true nature that there is nothing left to seek.",
  },

  // ── Practical daily life ───────────────────────────────────────────────────

  {
    id: "D52",
    title: "How to make a difficult decision when you don't know what to do",
    text: "The entire Gita is an extended answer to a person who cannot make a decision. What Krishna does for Arjuna is not give him the answer. He dismantles the assumptions that were blocking Arjuna's access to his own clarity. The grief Arjuna was experiencing was real — but it was not wisdom. The inaction he was choosing felt safe — but it was not. The identity he was protecting by refusing to act was built on sand. When Krishna removes those false foundations one by one, Arjuna's path becomes clear — not easy, but clear. This is the Gita's method for every difficult decision: instead of asking 'what should I do,' ask 'who is the person being asked to do it, and what do I honestly know about my own values, my genuine capacities, and what this situation actually requires?' The answer, when those three align, tends to reveal itself.",
  },
  {
    id: "D53",
    title: "Discipline, habits, and building a consistent daily practice",
    text: "The Gita describes the yogi's daily life with striking practicality: regular hours, moderation in eating and sleeping, balance between activity and rest, the body treated as a valued instrument rather than either indulged or punished. The concept of tapas — disciplined practice — is not about deprivation or punishment. It is the voluntary building of inner capacity through consistent, repeated effort over time. The keyword is consistent. Not heroic. Not perfect. Consistent. Small disciplines compound invisibly until one day you notice that you have become someone different from who you were when you started. That is what daily practice does. The Gita does not promise immediate results. It promises genuine transformation — to those willing to show up, again and again, without needing proof that it is working.",
  },
  {
    id: "D54",
    title: "Ahamkara — the false ego, its dissolution, and what remains",
    text: "Ahamkara is the part of the mind that says without pause: 'I am the doer. This is mine. My success, my failure, my reputation, my story.' It is not malicious. It is simply confused — it has mistaken itself for the whole of you, when it is only the most restless layer. The Gita does not ask for the annihilation of personality. It asks for the loosening of this particular identification — the one that claims sole authorship of every outcome. When the ego owns every success, it must also own every failure. When it must constantly defend its territory, every criticism is a threat. When it needs to guarantee the result before it begins, it becomes the obstacle to its own goals. Releasing ahamkara does not make you passive. It makes your action cleaner, less defended, and more genuinely effective — because you are no longer spending half your energy managing the ego's story instead of doing the work.",
  },
  {
    id: "D55",
    title: "How to deal with uncertainty, change, and things outside your control",
    text: "The world will never stop changing. Outcomes will never be fully within your control. People will act in ways you did not anticipate. The Gita's teaching — do your duty completely, release the result — is not a philosophy for comfortable times. It is a framework for living sanely in radical uncertainty. You are not asked to pretend the uncertainty does not exist, or to become indifferent to how things turn out. You are asked to put all your energy into the quality of what you are doing, and none of it into trying to force what cannot be forced. The person who has genuinely practised this acts more freely, more boldly, and more effectively than the person who cannot begin until they have a guarantee — because they are not waiting for certainty that will never arrive.",
  },
  {
    id: "D56",
    title: "Simple living, minimalism, and reducing desire",
    text: "The Gita's teachings on simplicity are not an aesthetic. They are a freedom. The person who genuinely does not require much to feel whole — who is not on an endless conveyor of needing the next thing, the next experience, the next validation — is not poor. They are more free than any amount of accumulation can make a person. This is not about poverty or deprivation. It is about the inner recognition that compulsive wanting is itself a form of suffering — that the craving never stops with what it gets, that fulfilling one desire reliably generates the next. The Gita's minimalism begins internally: with the discipline of noticing the difference between what you genuinely need and what the ego has convinced you that you cannot live without.",
  },

  // ── FIVE EXPERT CORRECTIONS ───────────────────────────────────────────────

  {
    id: "E1",
    title: "Dharma first — the Gita is not about detachment, it is about courageous duty",
    text: "The most common misreading of the Gita is that it teaches 'don't worry about results.' That is only half the teaching. Krishna's first instruction is: discover your dharma, then perform it wholeheartedly and with courage. Without dharma at the centre, detachment becomes an excuse for passivity and avoidance. The Gita does not teach withdrawal from life — it teaches discovering one's highest duty (svadharma) and performing it with full intensity, full integrity, and without selfish attachment to personal gain. Detachment from results is the fruit of living one's dharma fully, not a replacement for it.",
  },
  {
    id: "E2",
    title: "The Gita is a manual for transformation, not a philosophy lecture",
    text: "Krishna's goal on the battlefield was never to make Arjuna knowledgeable about spiritual concepts. His goal was transformation — to change the kind of human being Arjuna was. The Gita is a practical manual for becoming a different person: less reactive, less driven by ego and fear, more capable of acting from clarity and genuine values. A reader who finishes the Gita with a collection of spiritual ideas but no change in how they live, how they react, or how they treat others has missed the point entirely. The measure of having understood the Gita is not what you know — it is who you are becoming.",
  },
  {
    id: "E3",
    title: "What surrender (Chapter 18.66) really means — not passivity, but releasing ego",
    text: "Bhagavad Gita 18.66 — 'Abandon all duties and surrender unto me' — is the most misunderstood verse in the text. Krishna is not asking Arjuna to abandon his responsibilities, stop working, or withdraw from life. He is asking Arjuna to abandon ego, fear, pride, and the exhausting illusion that he alone controls every outcome. True surrender in the Gita means acting with full effort while releasing the claim that you are the sole author of the result. The surrendered person works harder and more effectively — not less — because they are no longer paralysed by the need to guarantee the outcome before they begin.",
  },
  {
    id: "E4",
    title: "Ahamkara — the false ego is the root of all suffering",
    text: "Krishna repeatedly points to a single root cause beneath desire, anger, fear, jealousy, comparison, pride, and anxiety: ahamkara, the false ego. Ahamkara is the mistaken identification of the self with the body, the mind, the role, the achievement, the reputation — with anything temporary and changeable. Because the ego is inherently fragile and temporary, everything built on it is unstable. Attachment arises because the ego needs things to feel secure. Fear arises because the ego dreads losing what it has. Anger arises when the ego is threatened. Every major teaching in the Gita — on action, devotion, knowledge, and meditation — is ultimately an instruction for loosening the grip of ahamkara and discovering the stable, unthreatened self beneath it.",
  },
  {
    id: "E5",
    title: "Daily Gita practice — how to live the teaching tomorrow morning",
    text: "The Gita is not meant to be understood only — it is meant to be lived. A practical daily practice drawn from its teachings: perform your duties sincerely and to the best of your ability each day. Before reacting to difficulty, pause — control your response before trying to control the situation. Spend a few minutes each day in silence or simple breath awareness. Offer your work to something larger than personal gain — to your family, your community, or the divine. Accept results graciously and continue working regardless. See every obstacle as an opportunity to practise steadiness. Each day, reduce ego slightly — catch yourself comparing, boasting, or seeking validation, and gently redirect. Serve at least one person each day without expecting anything in return.",
  },
  {
    id: "E6",
    title: "The deepest teaching — transform the doer, not just the action",
    text: "The most profound teaching of the Gita is widely misunderstood. Many people hear: 'Do your work without expecting results.' But Krishna's deeper message is: become the kind of person for whom success and failure no longer determine your peace. That is a completely different instruction. The first is advice about behaviour. The second is an invitation to transformation — to change not what you do but who is doing it. A person who has undergone this transformation still works, still strives, still cares about doing things well. But their sense of inner stability no longer depends on winning. This is not indifference — it is freedom. The Gita is ultimately about transforming the doer, not merely improving the action.",
  },

  {
    id: "E7",
    title: "Why Krishna teaches identity before giving any advice — wrong self-knowledge produces wrong action",
    text: "Krishna never tells Arjuna what to do until he first changes how Arjuna sees himself. This is deliberate and essential. Wrong identity produces wrong decisions — not because Arjuna lacks intelligence, but because every decision flows from a prior assumption about who is making it. When we believe we are only the body, the emotions, the achievements, or the failures, every decision becomes clouded by fear, attachment, and the desperate need to protect a fragile self. Krishna therefore begins by establishing the eternal, indestructible nature of the Atman — not as a philosophical lecture, but as the only foundation from which clear action is possible. Right knowledge naturally leads to right action. This is why the Gita always begins with understanding before advice, with identity before instruction, with 'who are you?' before 'what should you do?' Every subsequent teaching — on duty, action, devotion, and liberation — rests on this single correction. Any answer to a human question that skips this step will be superficial, because it is addressing the behaviour of a person who still misunderstands their own nature.",
  },

  // ── SCHOLAR-TEACHER Q&A — SOUL-TOUCHING & TEXTUALLY GROUNDED ─────────────
  // Nine new passages on death/afterlife, happiness, grief, surrender, peace,
  // suffering, relationship between knowledge and love, waking up daily, and
  // what the Gita says to the person who has lost faith in God.
  // Sources: primary text (chapter/verse references embedded), Shankara's
  // Vivekachudamani, Ramanuja's Gita Bhashya, Gandhi's Anasakti Yoga,
  // Vivekananda's lectures, Radhakrishnan's commentary, Eknath Easwaran.

  {
    id: "D57",
    title: "Q: I am terrified of dying. What does the Gita say to someone who fears death?",
    text: "Fear of death, the Gita says, is the fear of losing what you never truly owned. In Chapter 2, Krishna addresses Arjuna's dread directly — not with dismissal but with a fundamental re-orientation: what you call 'I' is the Atman, and the Atman was never born and will never die (2.20). The body is real in the way a rented house is real — you live in it, care for it, and leave it when the lease ends. But you are the tenant, not the house. Adi Shankara's Advaita commentary deepens this: the Atman is not merely indestructible but is identical to the infinite Brahman — pure, undivided awareness. What dies is the costume. What you are has always been beyond birth and beyond death. The fear does not mean something is wrong with you — it means you have been identifying yourself entirely with the body and mind, which is the most natural mistake a human being can make. Krishna's teaching is not 'stop feeling afraid.' It is: come to know yourself more truly, and the fear will gradually lose its ground. Radhakrishnan observed that no philosophy has treated the question of death with more directness, warmth, and philosophical precision than the Bhagavad Gita.",
  },

  {
    id: "D58",
    title: "Q: My loved one has died. I cannot stop crying. What does the Gita say to me right now?",
    text: "The Gita opens with someone who cannot stop crying. Arjuna has collapsed under the weight of imminent loss — and Krishna does not tell him to stop feeling or to pull himself together. He sits with him. He listens. Then, gradually, he offers a larger view: the person you are weeping for has not gone. Only the body, which was always temporary, has ended. The soul — the essential person — continues (2.12–13). Every major commentator acknowledges that this does not dissolve grief immediately, nor should it. Eknath Easwaran noted that the Gita is not a cure for grief but a container large enough to hold it without being destroyed by it. What you are feeling is love — and love is precisely what the Gita asks you to keep. What the Gita asks you to loosen, gradually and gently over time, is the belief that because the body is gone, the connection is gone. The connection was never only bodily. The person you loved exists at a level that no death has ever touched.",
  },

  {
    id: "D59",
    title: "Q: What happens to a good person after they die? Do they go to heaven?",
    text: "Chapter 8 gives the Gita's most detailed answer to what happens after death. The state of mind at the moment of death — what one has thought about throughout life, what one has clung to, and what one has loved — shapes the next stage of the soul's journey (8.6). Krishna describes two paths: the 'bright path' (shukla gati), taken by those who have freed themselves from craving and ego, which leads to liberation and no return to rebirth; and the 'dark path' (krishna gati), taken by those still bound by desire, which leads to rebirth (8.24–26). A good person — one who has lived with genuine devotion, selfless care, and sincere practice — moves toward progressively lighter and more expansive states of being. Ramanuja's Vishishtadvaita tradition holds that the soul of a sincere devotee, after death, approaches the divine in an intimate personal relationship that deepens rather than dissolves. What is clear across all traditions reading the Gita: death is not an ending. It is a transition whose quality depends not on outward success but on the inward character a person has built across an entire lifetime.",
  },

  {
    id: "D60",
    title: "Q: Does the Gita believe in heaven and hell? What are they?",
    text: "The Gita does mention heavenly realms (svarga loka) and lower realms but treats them very differently from the eternal heaven and hell of some other traditions. In Chapters 8 and 9, Krishna describes the heavens as realms of extended enjoyment — souls who have accumulated merit through virtuous action may dwell there for vast periods of time. But even heaven is temporary (9.21): when the merit is exhausted, the soul returns to earth. This makes the Gita's cosmology unusual and instructive. Heaven is not the final goal — liberation (moksha) is. Even a very good life that produces great merit only earns a long, beautiful respite before the journey continues. The Gita's point is not to discourage virtue but to reframe the destination: the goal is not to earn a long holiday but to discover the source of lasting peace that no realm, however beautiful, provides automatically. That peace is found not in any place but in the recognition of the self's true nature — which is always present, regardless of which realm the soul currently occupies.",
  },

  {
    id: "D61",
    title: "Q: If the soul is eternal, why does death still feel so devastating and final?",
    text: "Because you loved someone with a heart, not with a philosophy. The Gita never asks you to feel death as merely theoretical. Arjuna's grief — hands trembling, bow slipping, unable to speak — is treated with complete seriousness as the authentic starting point of genuine inquiry. Krishna does not say: 'Your tears are a mistake.' He says: 'Let me show you something larger than what you can see right now.' The devastation of death is partly about the body — and the body was real, was warm, was present, and that specific embodied person is genuinely gone. The Gita's teaching on the eternal soul does not cancel that. What it does is refuse to let the story end there. It insists that the person you loved was always more than their body, and that more continues. Vivekananda taught that genuine spiritual practice does not suppress the capacity for love — it expands it. A person who truly knows the soul's eternity does not love less; they love more completely and more freely, because they are no longer gripping the beloved out of terror that any moment might be the last.",
  },

  {
    id: "D62",
    title: "Q: How to feel happy when everything in my life feels wrong?",
    text: "The Gita's teaching on happiness is one of its most honest and most counterintuitive. Chapter 5 says: 'One who is not disturbed in mind even amid the threefold miseries or elated when there is happiness, and who is free from attachment, fear, and anger, is called a sage of steady mind' (5.20). This is not asking you to pretend that pain is pleasant. It is making a more startling observation: the happiness that depends entirely on circumstances going right is not really happiness — it is relief. Real happiness, in the Gita's analysis, is a quality of the inner life that is less conditional. It is cultivated, not stumbled upon. Chapter 6 describes it as the joy the yogi finds within — 'the joy of the inner self' (6.20–21), compared to one who has found a spring in the middle of a desert. This inner joy does not require everything to go right. It requires the mind to be less enslaved by the narrative that everything is wrong. Practically: the Gita suggests that the fastest path to this joy is not fixing circumstances but shifting your relationship to them — through sincerely caring for others (which gets the attention off yourself), through practice that steadies the mind, and through accepting what cannot be changed without bitterness.",
  },

  {
    id: "D63",
    title: "Q: Can a person find permanent happiness? Or is happiness always fleeting?",
    text: "The Gita makes a sharp distinction between two kinds of happiness that has never been surpassed in clarity. Chapter 18 describes three kinds of happiness corresponding to the three gunas. Tamasic happiness comes from sleep, laziness, and avoiding reality — it feels pleasant at first but ends in dullness (18.39). Rajasic happiness comes from getting what you want — it is intensely pleasurable but fades immediately and produces craving for more (18.38). Sattvic happiness is different in kind, not just in degree: it 'seems like poison at first but is like nectar in the end' (18.37). This is the happiness of discipline, of genuine self-knowledge, of acting from values rather than impulse. It is hard to enter — giving up familiar pleasures, sitting with discomfort, doing the work of self-examination — but once established, it does not depend on external conditions. Radhakrishnan called this the Gita's most psychologically sophisticated teaching: the happiness that is hardest to enter is the only one that does not eventually betray you.",
  },

  {
    id: "D64",
    title: "Q: What does the Gita say to someone who has lost all faith — in God, in goodness, in themselves?",
    text: "Chapter 9 contains a verse that has sustained millions of people in exactly this condition: 'Even if you are considered to be the most sinful of all sinners, you shall cross over all wickedness with the boat of knowledge' (4.36). Krishna does not ask Arjuna to feel faith before he has it. He gives Arjuna a reason to act — and then asks him to watch what happens when he acts from that reason. Gandhi, who read the Gita daily for fifty years, observed that the Gita does not demand faith as a precondition; it offers knowledge as an anchor when faith is gone. If you have lost faith in God, the Gita asks: do you still believe that acting with integrity is better than acting without it? Do you still believe that honesty matters, even a little? That care for another person is worth something? If yes — that is enough to begin. The Gita calls this the smallest flame that does not go out: the recognition, however dim, that something in you knows the difference between acting well and acting badly. That recognition is the Atman. It has never been absent. It is what is doing the doubting.",
  },

  {
    id: "D65",
    title: "Q: What does the Gita say about how to prepare for death — how should I live?",
    text: "Chapter 8 gives the Gita's most direct answer: 'Whatever state of being one remembers when he quits his body, that state he will attain without fail' (8.6). This is not a counsel of deathbed deception — pretending to think holy thoughts at the last moment. It is a teaching about the entire shape of a life. What you think about constantly, what you care about deeply, what you return to when you are not distracted — this is what you are. A life lived with genuine devotion, with sincere effort, with honest service to others, and with a gradually deepening understanding of the self's true nature — that life prepares for death not by rehearsing it but by living fully enough that death holds no unfinished business. The Gita's practical counsel, drawn from Chapters 6, 12, and 18, is this: develop a stable inner life through regular practice; loosen your grip on outcomes; care genuinely for others; offer your work to something larger than yourself; and cultivate the understanding that what you are is not reducible to what happens to you. This is not preparation for death. It is the life death cannot touch.",
  },

  // ── SOULFUL TOPIC PASSAGES — failure / success / peace / past / confidence ─

  {
    id: "D66",
    title: "Bouncing back from failure — the Gita's practical teaching",
    text: "When something you worked for collapses, there is a moment that feels like the ground disappearing — everything you were sure of, everything you built toward, and now the silence where it was. The Gita's word for what you need right now is samatvam: evenness of mind. Not the forced smile of someone pretending they are fine. The quiet steadiness of someone who has rooted their identity somewhere the outcome cannot reach. Bhagavad Gita 2.48 — perform your duty with evenness of mind, abandoning attachment, equal in success and failure. This is not asking you to feel nothing. It is asking you to refuse to let the result be the final word on your worth. A failure seen clearly and honestly is precise information — it tells you what you could not yet see from where you were standing. Look at it. Learn from it. Then return to action with the same full commitment you brought before, now carrying what you did not know then.",
  },

  {
    id: "D67",
    title: "How to stop overthinking and find stillness in a restless mind",
    text: "The Gita describes the overthinking mind with a tenderness that is itself comforting: Arjuna says the mind is like the wind — violent, wayward, impossible to hold. Krishna does not disagree. He says: yes. And it is still possible to find stillness within it. The practice is not to silence the mind by force — that creates a different noise, the noise of the war against noise. It is to give the mind something so completely absorbing, so genuinely aligned with your deepest values, that it settles naturally around that centre. Full attention to the present action — not the outcome, not what might go wrong — is the Gita's method for quieting the storm. Chapter 6 describes the settled mind as a lamp in a windless place: it does not flicker. Not because nothing moves around it, but because something within it has found its ground. That ground is always here, waiting beneath the noise.",
  },

  {
    id: "D68",
    title: "How to be successful in life — what the Gita actually teaches",
    text: "The Gita does not offer techniques for success. It asks a prior question: successful at what, and for whom? That question, answered honestly, reorders everything. Krishna tells Arjuna that genuine effectiveness — the kind that doesn't hollow you out, the kind that sustains itself over a lifetime — comes from knowing what is genuinely yours to do, doing it without holding back, and releasing the outcome with open hands. This is Gita 2.47 — the most quoted verse in the text, because it cuts to something real: when you stop trying to control the result and put all that liberated energy into the quality of your effort instead, the work becomes better and the person doing it becomes more free. That is real success in the Gita's language. Not the prize at the end. The person you are becoming through how you work.",
  },

  {
    id: "D69",
    title: "How to let go of the past and stop being haunted by old mistakes",
    text: "You keep returning to something that happened — or something you did. It plays again. You wish it had gone differently. The Gita's teaching on this is not simply 'forgive yourself and move on.' It is something deeper: the one who made that mistake and the one here right now are not the same person. You have changed, even if you cannot fully see it yet. The soul at your core was never damaged by what happened — it has been present through all of it, witnessing, learning, and it has never been diminished. Chapter 18.66 is the Gita's most direct invitation to release: do not grieve. Not because the past did not matter, but because the past is not where your freedom lives. Right now — in this moment — you can choose differently. That capacity is your freedom. Do not spend it living in a time that is already over.",
  },

  {
    id: "D70",
    title: "How to build genuine self-confidence grounded in the Gita",
    text: "There is a confidence that performs certainty in front of others — fragile, requiring constant maintenance, collapsing when something goes wrong. And there is what the Gita points toward: something quieter, more durable, and entirely independent of how the last thing went. Bhagavad Gita 6.5 — let a person lift themselves by their own self; let them not lower themselves, for this self alone is the friend of oneself. The self that is your friend is not the ego — not the part that monitors other people's opinions of you. It is the Atman: the witnessing awareness that has been present through every experience you have ever had, including the worst ones, and that has never once been destroyed by any of them. When you begin — even slightly — to identify with that, criticism lands differently. Failure lands differently. You are still fully present, still caring, still giving everything. But something in you knows, with quiet certainty, that what you essentially are is not on trial.",
  },

  {
    id: "D71",
    title: "Finding peace of mind when life feels uncontrollable",
    text: "Everything is moving at once and none of it is in your hands. That is the battlefield. That is exactly where Arjuna was sitting. Krishna's answer is not 'relax.' It is surgical: separate with complete honesty what is within your power from what is not, and put everything — all of your energy, all of your care, all of your intelligence — into the former. Release the latter. Not with resignation, not with the defeated shrug of someone who has given up. With the specific, clean release of someone who has recognised where effort genuinely belongs. Bhagavad Gita 2.47 is not a philosophy of detachment. It is the most concentrated instruction on effectiveness ever written: when you stop trying to manage what cannot be managed, every bit of that energy flows back into what can be. The result is not less effort. It is clearer, freer, more powerful effort — and beneath it, for the first time, something beginning to settle.",
  },

  {
    id: "D72",
    title: "Devotion as the path through darkness — when nothing else works",
    text: "There are moments when the knowledge doesn't land. You know what the Gita says about the eternal soul and it helps nothing. The words are correct and they do not reach you. In those moments, I do not ask for understanding. I ask for something simpler: turn toward me. Chapter 9 verse 22 — to those who seek me with devotion, I carry what they lack and preserve what they have. This is not a transaction. It is the teaching that when the self is too exhausted to reason its way through the darkness, love is still a door. Even a small, sincere turning — not recitation, not ritual, but the genuine offering of this painful moment to something larger than your private suffering — opens something. It may not open immediately. But it opens. The promise to the soul in the dark is not that the light will come all at once. It is that you do not have to find it alone.",
  },
];
