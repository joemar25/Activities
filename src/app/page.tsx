import Link from 'next/link'

import { ThemeChange } from '@/components/theme/theme-change'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const activities = [
  {
    title: 'Activity 1',
    description: 'Center “Hello World” in the middle of the browser window.',
  },
  {
    title: 'Activity 2',
    description: `Create a counter app with increment, decrement, reset functionality, 
                  and indicate if the number is odd or even.`,
  },
  {
    title: 'Activity 3',
    description: `Create a simple calculator that can add 2 numbers. The sum should update 
                  as values are typed. Add a reset button.`,
  },
  {
    title: 'Activity 4',
    description: `Create a button with text “GROW” that doubles in size and changes to 
                  a random color on click.`,
  },
  {
    title: 'Activity 5',
    description: `Create a basic to-do list with the ability to add, remove, 
                  check, and uncheck items.`,
  },
  {
    title: 'Activity 6',
    description: `Create a “CardList” that displays API data as “Cards”. Each card 
                  should have an avatar, name, and description.`,
  },
  {
    title: 'Activity 7',
    description: `Optional: Add tests to one of the previous activities. Test rendering, 
                  labels, and functionality using Jest and React Testing Library.`,
  },
  {
    title: 'Activity 8',
    description: `Optional: Create a to-do list app using Supabase. Include CRUD operations, 
                  authentication, and persist state on browser restart.`,
  },
]

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen p-4 bg-background">
      {/* Header with Theme Switcher */}
      <header className="w-full flex items-center justify-between p-4 border-b border-border bg-muted">
        <h1 className="text-2xl font-bold">Welcome to Joemar Cardño&apos;s Assessment</h1>
        <ThemeChange />
      </header>

      {/* Main Content */}
      <section className="flex flex-col items-center justify-center flex-grow py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Select an Activity</h2>
        <p className="text-gray-600 mb-12 text-center max-w-md">
          Choose from the activities below and explore the features we&apos;ve designed.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <Link href={`/activity${index + 1}`} key={index}>
              <Card className="group hover:scale-105 transition-transform shadow-md">
                <CardHeader className="text-center p-4 bg-accent group-hover:bg-accent-dark">
                  <CardTitle className="text-xl font-bold text-primary">
                    {activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-center">
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
