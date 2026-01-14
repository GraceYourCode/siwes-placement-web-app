import { useState, useRef } from "react";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label?: string;
  error?: string;
  hint?: string;
  accept?: string;
  maxSize?: number; // in MB
  bucket?: string;
  folder?: string;
  value?: string;
  onChange?: (url: string | null) => void;
  required?: boolean;
  disabled?: boolean;
}

export function FileUpload({
  label,
  error,
  hint,
  accept = ".pdf,.doc,.docx",
  maxSize = 5,
  //   bucket = "documents",
  folder = "",
  value,
  onChange,
  required,
  disabled,
}: FileUploadProps) {
  const user = {
    id: 1,
    email: "me@mail.com",
  };
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setUploadError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${
        folder ? folder + "/" : ""
      }${Date.now()}.${fileExt}`;
      alert(filePath);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFileName(null);
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayError = uploadError || error;

  return (
    <div className="space-y-2">
      {label && (
        <Label className={displayError ? "text-destructive" : ""}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      {value || fileName ? (
        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm truncate max-w-50">
              {fileName || "Uploaded file"}
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            disabled={disabled || uploading}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
            disabled
              ? "bg-muted cursor-not-allowed"
              : "hover:border-primary cursor-pointer",
            displayError && "border-destructive"
          )}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={disabled || uploading}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                {accept.replace(/\./g, "").toUpperCase()} (max {maxSize}MB)
              </p>
            </div>
          )}
        </div>
      )}

      {hint && !displayError && (
        <p className="text-caption text-muted-foreground">{hint}</p>
      )}
      {displayError && (
        <p className="text-caption text-destructive">{displayError}</p>
      )}
    </div>
  );
}
