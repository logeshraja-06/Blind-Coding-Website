import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Search,
  CheckCircle2,
  Code,
  Terminal,
  ChevronDown,
  ChevronUp,
  Tag,
  BookOpen
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { QUIZ_QUESTIONS } from '../../data/questions';
import { useToast } from '../../context/ToastContext';

export const AdminQuestions = () => {
  const { addToast } = useToast();
  const [questions, setQuestions] = useState(QUIZ_QUESTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [expandedQuestion, setExpandedQuestion] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    category: 'JavaScript',
    difficulty: 'Medium',
    question: '',
    codeSnippet: '',
    optA: '',
    optB: '',
    optC: '',
    optD: '',
    correctAnswer: 'A',
    explanation: '',
  });

  const categories = [
    'ALL',
    'JavaScript',
    'Python',
    'C++',
    'Algorithms',
    'Data Structures',
    'Bitwise Logic',
    'Recursion',
    'SQL & DB Logic',
    'Object-Oriented Programming',
  ];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === 'ALL' || q.category === selectedCategory;
    const matchesDiff =
      selectedDifficulty === 'ALL' || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesCat && matchesDiff;
  });

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.question.trim() || !newQuestion.optA.trim() || !newQuestion.optB.trim()) {
      addToast('Please fill in the question and options.', 'warning', 3000);
      return;
    }

    const created = {
      id: questions.length + 1,
      category: newQuestion.category,
      difficulty: newQuestion.difficulty,
      question: newQuestion.question,
      codeSnippet: newQuestion.codeSnippet || null,
      options: [
        { id: 'A', text: newQuestion.optA },
        { id: 'B', text: newQuestion.optB },
        { id: 'C', text: newQuestion.optC || 'Option C' },
        { id: 'D', text: newQuestion.optD || 'Option D' },
      ],
      correctAnswer: newQuestion.correctAnswer,
      explanation: newQuestion.explanation || 'Created by Event Admin.',
    };

    setQuestions([...questions, created]);
    setIsAddModalOpen(false);
    addToast('Question added successfully to question bank!', 'success', 3000);
    setNewQuestion({
      category: 'JavaScript',
      difficulty: 'Medium',
      question: '',
      codeSnippet: '',
      optA: '',
      optB: '',
      optC: '',
      optD: '',
      correctAnswer: 'A',
      explanation: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Search & Actions Header */}
      <Card variant="default" className="p-5 border border-teaGreen-300 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80">
            <Input
              placeholder="Search questions by text or concept..."
              icon={Search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-ivory border border-teaGreen-300 text-xs font-semibold text-drabDark px-3 py-2.5 rounded-xl outline-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Categories' : c}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-ivory border border-teaGreen-300 text-xs font-semibold text-drabDark px-3 py-2.5 rounded-xl outline-none cursor-pointer"
            >
              <option value="ALL">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              icon={Plus}
              className="text-xs font-bold"
            >
              Add Question
            </Button>
          </div>
        </div>
      </Card>

      {/* Questions Count Indicator */}
      <div className="flex items-center justify-between text-xs text-drabDark/70 px-1">
        <span>
          Showing <strong>{filteredQuestions.length}</strong> of <strong>{questions.length}</strong> active questions
        </span>
        <span>Round: 01 (60 Minutes)</span>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedQuestion === q.id;
          return (
            <Card
              key={q.id}
              variant="default"
              className="p-6 border border-teaGreen-300 bg-white transition-all duration-200"
            >
              {/* Question Header */}
              <div
                onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                className="flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-comfortaa font-bold text-xs bg-celticBlue-50 text-celticBlue px-2.5 py-0.5 rounded-md border border-celticBlue-200">
                      Q{String(q.id).padStart(2, '0')}
                    </span>
                    <Badge variant="info" size="sm">
                      {q.category}
                    </Badge>
                    <Badge
                      variant={
                        q.difficulty === 'Easy'
                          ? 'success'
                          : q.difficulty === 'Medium'
                          ? 'warning'
                          : 'dark'
                      }
                      size="sm"
                    >
                      {q.difficulty}
                    </Badge>
                    <span className="text-[11px] font-semibold text-teaGreen-600">
                      ✓ Correct: Option {q.correctAnswer}
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm sm:text-base text-drabDark">
                    {q.question}
                  </h3>
                </div>

                <button
                  type="button"
                  className="p-1 rounded-lg text-drabDark/60 hover:bg-teaGreen-100"
                  aria-label="Toggle Question Details"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Expandable Details */}
              {isExpanded && (
                <div className="pt-5 mt-4 border-t border-teaGreen-200 space-y-4">
                  {/* Code snippet if any */}
                  {q.codeSnippet && (
                    <div className="rounded-xl overflow-hidden bg-drabDark border border-drabDark-700">
                      <div className="px-4 py-1.5 bg-drabDark-700 text-[10px] font-mono text-ivory/60 flex items-center gap-2">
                        <Terminal className="w-3 h-3" />
                        <span>Code Reference</span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-teaGreen-100 overflow-x-auto">
                        <code>{q.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Options 4 Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {q.options.map((opt) => {
                      const isCorrect = (opt.id || 'A') === q.correctAnswer;
                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                            isCorrect
                              ? 'bg-teaGreen-100/70 border-teaGreen-500 font-semibold text-drabDark'
                              : 'bg-ivory/60 border-teaGreen-200 text-drabDark/80'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                                isCorrect ? 'bg-teaGreen-600 text-white' : 'bg-white border text-drabDark/60'
                              }`}
                            >
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          {isCorrect && <CheckCircle2 className="w-4 h-4 text-teaGreen-600" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-3.5 rounded-xl bg-celticBlue-50 border border-celticBlue-200 text-xs text-drabDark/90">
                    <strong className="text-celticBlue">Answer Key Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Add Question Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Question"
        subtitle="Create a new multiple choice question for Round 01"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleAddQuestion} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              options={categories.filter((c) => c !== 'ALL').map((c) => ({ value: c, label: c }))}
              value={newQuestion.category}
              onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
            />
            <Select
              label="Difficulty"
              options={[
                { value: 'Easy', label: 'Easy' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Hard', label: 'Hard' },
              ]}
              value={newQuestion.difficulty}
              onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
            />
          </div>

          <Input
            label="Question Text"
            placeholder="e.g. What will be the output of..."
            required
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-drabDark/80 mb-1.5">
              Code Snippet (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="int main() { ... }"
              className="w-full bg-white text-drabDark font-mono text-xs border border-teaGreen-300 rounded-xl p-3 outline-none focus:border-celticBlue"
              value={newQuestion.codeSnippet}
              onChange={(e) => setNewQuestion({ ...newQuestion, codeSnippet: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Input
              label="Option A"
              placeholder="Value A"
              required
              value={newQuestion.optA}
              onChange={(e) => setNewQuestion({ ...newQuestion, optA: e.target.value })}
            />
            <Input
              label="Option B"
              placeholder="Value B"
              required
              value={newQuestion.optB}
              onChange={(e) => setNewQuestion({ ...newQuestion, optB: e.target.value })}
            />
            <Input
              label="Option C"
              placeholder="Value C"
              value={newQuestion.optC}
              onChange={(e) => setNewQuestion({ ...newQuestion, optC: e.target.value })}
            />
            <Input
              label="Option D"
              placeholder="Value D"
              value={newQuestion.optD}
              onChange={(e) => setNewQuestion({ ...newQuestion, optD: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Select
              label="Correct Answer Option"
              options={[
                { value: 'A', label: 'Option A' },
                { value: 'B', label: 'Option B' },
                { value: 'C', label: 'Option C' },
                { value: 'D', label: 'Option D' },
              ]}
              value={newQuestion.correctAnswer}
              onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
            />
            <Input
              label="Brief Explanation"
              placeholder="Why this option is correct..."
              value={newQuestion.explanation}
              onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="font-bold">
              Save Question
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
