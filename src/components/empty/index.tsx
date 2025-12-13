import {  Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "@/lib/navigation";

interface EmptyRecordProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}
const EmptyRecord = ({
  title = "No Record Found",
  description = "Oops! Không tìm thấy yêu cầu của bạn.\n Hãy thử lại nhé!",
  onRetry = () => {},
}: EmptyRecordProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Package />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button as={Link} href="/">
            Back to Home
          </Button>
          <Button variant="outline" onClick={onRetry}>
            Retry
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyRecord;
