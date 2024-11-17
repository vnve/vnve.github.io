import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { downloadFile } from "@/lib/utils";
import { useEditorStore } from "@/store";
import { Progress } from "@/components/ui/progress";
import { ActionProgress } from "./types";

export function ExportVideoDialog({
  progress,
  url,
  isOpen,
  onClose,
}: {
  progress: ActionProgress;
  url: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const project = useEditorStore((state) => state.project);
  const handleOpenChange = (value) => {
    if (!value) {
      onClose();
    }
  };

  const handleDownloadVideo = () => {
    downloadFile(project.name, url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="min-w-[80vw]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>导出</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {!url && <Progress value={progress.value} />}
        {url && (
          <video src={url} className="w-full aspect-[16/9]" controls></video>
        )}
        <DialogFooter>
          {url && (
            <Button onClick={handleDownloadVideo}>
              <Icons.download className="size-4 mr-1"></Icons.download>
              保存视频
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
