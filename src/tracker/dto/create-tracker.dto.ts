export class CreateTrackerDto {
    playlistid: number;
    youtubeIframeUrl: string;
    status?: 'idle' | 'inprogress' | 'done';
}
