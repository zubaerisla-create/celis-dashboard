// app/admin/briefs/[id]/page.tsx
'use client';

import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Mock data – in real app you'd fetch by id
const mockBriefs: Record<string, any> = {
  '1': {
    title: 'Summer Vibes 2024',
    tier: 'Excel',
    status: 'Active',
    createdBy: 'A&R Team - Mike',
    deadline: 'Mar 15, 2024',
    submissions: 47,
    genre: 'Pop, Electronic, Indie',
    bpmRange: '120-140',
    description: 'Looking for upbeat, summer-themed tracks with positive energy. Perfect for commercials, social media content, and lifestyle brands.',
    mood: 'Happy, Energetic, Uplifting',
    clientName: 'SunBrand Marketing Agency',
    budgetRange: '$2,000 - $5,000 per selected track',
    projectUsage: 'Social media campaigns, commercials, and brand content',
    technical: [
      'Format: WAV 44.1kHz/24-bit or 48kHz/24-bit',
      'Length: 2-3 minutes minimum',
      'BPM: 120-140',
      'Key: Major scales preferred',
      'Mix: Professional stereo mix with clear separation',
      'Master: -14 LUFS integrated loudness',
    ],
    creative: [
      'Upbeat and energetic summer vibes',
      'Positive and uplifting emotional tone',
      'Include melodic hooks and memorable chorus',
      'Suitable for commercial licensing',
      'Original composition (no samples from copyrighted works)',
    ],
    delivery: [
      'Full final mix required',
      'Stems (individual tracks) required',
      'Metadata sheet with credits',
      'Proof of copyright ownership',
    ],
  },
  // add other ids if needed
};

export default function BriefDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const brief = mockBriefs[id];

  if (!brief) {
    return (
      <div className="min-h-screen bg-gray text-gray-100 ">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Brief not found</h1>
        <Link href="/dashboard/briefs-management" >
          <h1 className="text-2xl font-bold">Back to Briefs Management</h1>
        </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray text-gray-100 ">
      <div className="max-w-9xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">{brief.title}</h1>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 rounded-lg hover:bg-emerald-600/30">
              <CheckCircle size={16} />
              Approve Brief
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/40 rounded-lg hover:bg-red-600/30">
              <XCircle size={16} />
              Reject Brief
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">
              Close Brief
            </button>
          </div>
        </div>

        {/* Info Bar */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <div>
              <div className="text-gray-500">Tier</div>
              <div className="mt-1 font-medium text-amber-400">{brief.tier}</div>
            </div>
            <div>
              <div className="text-gray-500">Status</div>
              <div className="mt-1 font-medium text-emerald-400">{brief.status}</div>
            </div>
            <div>
              <div className="text-gray-500">Submissions</div>
              <div className="mt-1 font-medium">{brief.submissions}</div>
            </div>
            <div>
              <div className="text-gray-500">Deadline</div>
              <div className="mt-1 font-medium">{brief.deadline}</div>
            </div>
            <div>
              <div className="text-gray-500">Genre</div>
              <div className="mt-1">{brief.genre}</div>
            </div>
            <div>
              <div className="text-gray-500">BPM Range</div>
              <div className="mt-1">{brief.bpmRange}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Description</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
              <p className="text-gray-300">{brief.description}</p>
              <div>
                <div className="text-gray-500 text-sm">Mood</div>
                <div className="mt-1">{brief.mood}</div>
              </div>
            </div>
          </section>

          {/* Client Requirements */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Complete Client Requirements</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-500 text-sm">Client Name</div>
                  <div className="mt-1">{brief.clientName}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500 text-sm">Budget Range</div>
                  <div className="mt-1 font-medium">{brief.budgetRange}</div>
                </div>
              </div>

              <div>
                <div className="text-gray-500 text-sm mb-2">Project Usage</div>
                <div>{brief.projectUsage}</div>
              </div>

              <div>
                <div className="text-gray-500 text-sm mb-2">Technical Requirements</div>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {brief.technical.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-gray-500 text-sm mb-2">Creative Requirements</div>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {brief.creative.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-gray-500 text-sm mb-2">Delivery Requirements</div>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {brief.delivery.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}