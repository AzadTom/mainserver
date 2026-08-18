export class CreateTrackerDto {
    playlistid!: number;
    youtubeIframeUrl!: string;
    status?: 'IDLE' | 'INPROGRESS' | 'DONE';
}
