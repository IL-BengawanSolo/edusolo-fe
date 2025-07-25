import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/utils/AuthProvider";

import JumbotronNotTest from "@/components/recommendation/JumbotronNotTest.jsx";
import JumbotronNotLogin from "@/components/recommendation/JumbotronNotLogin.jsx";
import PreferenceTest from "@/components/recommendation/PreferenceTest.jsx";
import JumbotronTestProgress from "@/components/recommendation/JumbotronTestProgress.jsx";
import JumbotronTestCompleted from "@/components/recommendation/JumbotronTestCompleted.jsx";

import useCheckRecommendationSession from "@/api/useCheckRecommendationSession";
import useFetchQuestions from "@/api/useFetchQuestions";
import usePostAIRecommendations from "@/api/usePostAIRecommendations";
import usePostRecommendationSession from "@/api/usePostRecommendationSession";
import useFetchLastRecommendationSession from "@/api/useFetchLastRecommendationSession";
import useFetchDestinationsFromRecommendationResult from "@/api/useFetchDestinationsFromRecommendationResult";

import { SpinnerCircular } from "spinners-react";

const Recommendation = () => {
  const { user, checking } = useAuth();

  // Hooks for session and questions
  const { hasSession, loading: hasSessionLoading } =
    useCheckRecommendationSession();

  const {
    questions,
    loading: questionsLoading,
    error: questionsError,
    fetchQuestions,
  } = useFetchQuestions();
  const { postRecommendations } = usePostAIRecommendations();
  const { postSession } = usePostRecommendationSession();
  const { session: lastSession } = useFetchLastRecommendationSession();
  const {
    destinations,
    loading: destinationsLoading,
    error: destinationsError,
    refetch: fetchDestinations,
  } = useFetchDestinationsFromRecommendationResult();

  // State
  const [beginTest, setBeginTest] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isRetakingTest, setIsRetakingTest] = useState(false);
  const [processingRecommendation, setProcessingRecommendation] =
    useState(false);

  // Derived sessionId
  const sessionId = lastSession?.id;

  // Fetch destinations when sessionId is available
  useEffect(() => {
    if (sessionId) fetchDestinations(sessionId);
  }, [sessionId, fetchDestinations]);

  // Handlers
  const handleStartTest = () => {
    setBeginTest(true);
    fetchQuestions();
  };

  const handleAnswer = (selected) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = selected;
      return newAnswers;
    });
  };

  const handleSubmitAIRecommendations = async () => {
    const preferred_categories = answers[0] || [];
    const n = 8;

    setProcessingRecommendation(true); // Mulai loading gimmick
    try {
      const newSession = await postSession();
      await postRecommendations({
        preferred_categories,
        n,
        session_id: newSession.id,
      });
      await fetchDestinations(newSession.id);
      setIsTestCompleted(true);
    } catch (err) {
      console.error("Error submitting AI recommendations:", err);
    } finally {
      // Delay 1 detik agar loading terasa
      setTimeout(() => setProcessingRecommendation(false), 1000);
    }
  };

  const handleRetakeTest = () => {
    setIsRetakingTest(true);
    setBeginTest(false);
    setIsTestCompleted(false);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  if (processingRecommendation) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80">
        <SpinnerCircular
          size={96}
          thickness={100}
          color="#3b82f6"
          secondaryColor="#e5e7eb"
        />
        <span className="mt-4 text-neutral-500">
          Memproses rekomendasi destinasi untukmu...
        </span>
      </div>
    );
  }

  // Render logic
  if (checking || hasSessionLoading || questionsLoading)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <SpinnerCircular
          size={48}
          thickness={100}
          color="#3b82f6"
          secondaryColor="#e5e7eb"
        />
        <span className="mt-4 text-neutral-500">
          Memuat data rekomendasi...
        </span>
      </div>
    );

  if (!user) return <JumbotronNotLogin />;

  if (hasSession && !isRetakingTest)
    return (
      <JumbotronTestCompleted
        destinations={destinations}
        onRetakeTest={handleRetakeTest}
      />
    );

  if (!beginTest) return <JumbotronNotTest onTestClick={handleStartTest} />;

  if (beginTest && !isTestCompleted) {
    if (questionsError)
      return (
        <div className="text-red-500">Error: {questionsError.message}</div>
      );

    const question = questions[currentQuestion];
    return (
      <>
        <JumbotronTestProgress
          current={currentQuestion + 1}
          total={questions.length}
        />
        <PreferenceTest
          currentQuestion={currentQuestion + 1}
          questionText={question?.question_text || ""}
          answerChoices={question?.answer_choices || []}
          selected={answers[currentQuestion] || []}
          setSelected={handleAnswer}
          onNext={() => {
            if (currentQuestion < questions.length - 1)
              setCurrentQuestion((prev) => prev + 1);
          }}
          onPrev={() => {
            if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
          }}
          isLast={currentQuestion === questions.length - 1}
          isFirst={currentQuestion === 0}
          onSubmit={handleSubmitAIRecommendations}
        />
      </>
    );
  }

  if (isTestCompleted) {
    if (destinationsLoading)
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <SpinnerCircular
            size={48}
            thickness={100}
            color="#3b82f6"
            secondaryColor="#e5e7eb"
          />
          <span className="mt-4 text-neutral-500">Memuat destinasi...</span>
        </div>
      );
    if (destinationsError)
      return <div className="text-red-500">{destinationsError}</div>;
    if (destinations.length > 0) {
      return (
        <JumbotronTestCompleted
          destinations={destinations}
          onRetakeTest={handleRetakeTest}
          onlyWithThumbnail
          loading={destinationsLoading}
        />
      );
    }
    return <div>No destinations found.</div>;
  }

  return null;
};

export default Recommendation;
