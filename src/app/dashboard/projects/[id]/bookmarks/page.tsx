import FeaturesHeader from "@/components/features/dashboard/features-header";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export default async function BookmarksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isEmpty = true;

  return (
    <Card>
      <CardHeader>
      <FeaturesHeader title={"Bookmarks"} buttonText={"Add Bookmark"} />
        <CardDescription>
          A collection of useful links, articles, and development resources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-muted-foreground">
                You haven't saved any bookmarks for this project yet.
              </p>

            </div>
          </div>
        ) : (
          <div>
            {/* This is where the list of bookmarks would be rendered */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
