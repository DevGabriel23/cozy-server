// src/utils/dateUtils.ts

/**
 * Calcula el tiempo transcurrido o retorna la fecha formateada.
 * @param dateString Fecha en formato ISO UTC (ej: "2026-07-03T10:00:00Z")
 * @returns string
 */
export function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    // Diferencia en milisegundos
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Si pasaron menos de 7 días (y no es futuro)
    if (diffDays >= 0 && diffDays < 7) {
        if (diffDays === 0) return "Hoy";
        if (diffDays === 1) return "Hace 1 día";
        return `Hace ${diffDays} días`;
    }

    // Formato para más de una semana
    const isSameYear = date.getFullYear() === now.getFullYear();

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short'
    };

    if (!isSameYear) {
        options.year = 'numeric';
    }

    // Intl.DateTimeFormat usa la zona horaria local del navegador
    const formatter = new Intl.DateTimeFormat('es-ES', options);

    // Formateamos y eliminamos el punto del mes si existiera (depende del navegador)
    return formatter.format(date).replace('.', '');
}

/**
 * Determina si una fecha es reciente (menos de 7 días).
 * @param date Fecha a evaluar en formato Date o string ISO UTC.
 * @returns boolean
 */
export function isRecent(date: Date | string): boolean {
    const targetDate = typeof date === 'string' ? new Date(date) : date;

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    return targetDate.getTime() >= sevenDaysAgo.getTime() && targetDate.getTime() <= now.getTime();
}